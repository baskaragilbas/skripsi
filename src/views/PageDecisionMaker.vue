<template>
  <div class="dm">
    <h3>Decision Maker</h3>
    <br>
    <b-container fluid class="text-light text-center">
      <b-form @submit="onSubmit" inline >
        <div>
          <b-form-select
                class="mb-2 mr-sm-2 mb-sm-0"
                v-model="start"
                :options="[...startdate]"
                on:blur="generateEndDate(start)"
                required >
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>-- Tanggal Mulai --</b-form-select-option>
                </template>
              </b-form-select>
          <b-form-select
                class="mb-2 mr-sm-2 mb-sm-0"
                v-model="end"
                :options="[...enddate]"
                >
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>-- Tanggal Selesai --</b-form-select-option>
                </template>
              </b-form-select>
        </div>

        <b-button type="submit" class="mb-2 mr-sm-2 mb-sm-0" variant="primary">Submit</b-button>
      </b-form>
      <br>
      <b-row class="mb-3">
        <b-col>
          <AppTable :items="items" :fields="fields" @redirect="redirectPage" ></AppTable>
        </b-col>
      </b-row>
    </b-container>  
  </div>
</template>

<script>
import AppTable from '@/components/AppTable.vue';
const { Op } = require("sequelize")
const db = require('@/../models/index.js')

const topsis = require('@/helper/topsis.js')

export default {
  components: {
    AppTable
  },
  data(){
    return{
      startdate: [],
      start: null,
      end: null,
      items: [],
      fields: [
        { key: 'row_number', label: 'No.', colType:"index"},
        { key: 'routeId', label: 'Id', colType:"text", sortable:true },
        { key: 'routeName', label: 'Rute', colType:"link", sortable:true },
        { key: 'value', label: 'Nilai Prioritas', colType:"text", sortable:true }
      ],
    }
  },
  computed:{
    enddate: function () {
      if (this.start == null){
        return []
      }else{
        return this.startdate.filter(data => data > this.start )
      }
    }
  },
  created(){
    db.Report.findAll({raw:true}).then(data=> this.startdate = data.map(report => report.reportDate))
  },
  methods:{
    groupBy(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x)

          return rv
        }, {})
    },
    onSubmit(evt){
      evt.preventDefault()

      let query = (this.end == null) ?
       " = '" + this.start + "' " :
       " BETWEEN ' " + this.start + " ' AND '" + this.end + " ' " 
      const headway = db.sequelize.query(
        'SELECT routeId, AVG(average) AS average ' +
        'FROM '+
        '( ' +
        'SELECT Headways.routeBusStopID, RouteBusStops.routeId, AVG(value) AS average ' +
        'FROM Reports ' +
        'LEFT JOIN Headways ON Reports.id = Headways.reportID ' +
        'LEFT JOIN RouteBusStops on Headways.routeBusStopID = RouteBusStops.id '+
        'WHERE Reports.reportDate' + query +
        'GROUP BY Headways.routeBusStopID ' +
        ')' +
        'GROUP BY routeId ' +
        'ORDER BY routeId'
        )

      const loadfactor = db.sequelize.query(
        'SELECT routeId, AVG(average) AS average ' +
        'FROM '+
        '( ' +
          'SELECT LoadFactors.routeBusStopID, RouteBusStops.routeId, AVG(value) AS average ' +
          'FROM Reports ' +
          'LEFT JOIN LoadFactors ON Reports.id = LoadFactors.reportID ' +
          'LEFT JOIN RouteBusStops on LoadFactors.routeBusStopID = RouteBusStops.id '+
          'WHERE Reports.reportDate =' + "'" + this.start + "' " +
          'GROUP BY LoadFactors.routeBusStopID ' +
        ')' +
        'GROUP BY routeId '+
        'ORDER BY routeId'
        )
      
      const frequency = db.sequelize.query(
        'SELECT routeId, ROUND(AVG(average)) AS average FROM ' +
        '( ' +
          'SELECT Frequencies.routeID, Frequencies.time, AVG(value) AS average FROM Reports ' + 
          'LEFT JOIN Frequencies ON Reports.id = Frequencies.reportID ' +
          'WHERE Reports.reportDate' + query +
          'GROUP BY Frequencies.routeId, Frequencies.time ' +
        ') ' +
        'GROUP BY routeId ' +
        'ORDER BY routeId'
      )

      const rtt = db.sequelize.query(
        'SELECT RTTs.routeID,  AVG(RTTs.minute) AS average FROM Reports ' +
        'LEFT JOIN RTTs ON Reports.id = RTTs.reportID ' +
        'WHERE Reports.reportDate' + query +
        'GROUP BY RTTs.routeId, Reports.id ' +
        'ORDER BY routeId'
      )

      const rttdistance = db.sequelize.query(
        'SELECT RTTs.routeId, RTTs.reportID, SUM((RTTs.minute-t.average)*(RTTs.minute-t.average))/(COUNT(t.reportID)-1) AS distance ' +
        'FROM RTTs JOIN ( ' + 
            'SELECT RTTs.routeID, RTTs.ReportId, AVG(RTTs.minute) AS average FROM Reports ' + 
            'LEFT JOIN RTTs ON Reports.id = RTTs.reportID ' + 
            'WHERE Reports.reportDate ' + query +
            'GROUP BY RTTs.routeId, Reports.id ) AS t ' +
        'on RTTs.routeId = t.routeId AND RTTs.reportID = t.reportID ' +
        'GROUP BY RTTS.routeId, RTTs.reportID ' +
        'ORDER BY t.routeId, t.reportID '
      )
      let ureport = db.sequelize.query(
        'SELECT t2.routeId, count(t2.reportID) as counter FROM  ( ' + 
        'SELECT RTTs.routeID, RTTs.ReportId, AVG(RTTs.minute) AS average FROM Reports ' + 
        'LEFT JOIN RTTs ON Reports.id = RTTs.reportID ' + 
        'WHERE Reports.reportDate ' + query +
        'GROUP BY RTTs.routeId, Reports.id) AS t2 ' +
        'GROUP By t2.routeId ' +
        'ORDER BY routeId'

      )
      let uroute = db.sequelize.query(
        'SELECT DISTINCT RTTs.routeId, Routes.routeName from Reports ' +
        'JOIN Routes ON Routes.id = RTTS.routeId ' +
        'LEFT JOIN RTTs ON Reports.id = RTTs.reportID '  +
        'WHERE Reports.reportDate ' + query +
        'ORDER BY RTTs.routeId'
      )

      let criteria = db.Criteria.findAll({raw:true})
        
        Promise.all([headway, loadfactor, frequency, rttdistance, ureport, uroute, criteria])
          .then( ([headway, loadfactor, frequency, rttdistance, ureport, uroute, criteria]) => {
            let rttavg = uroute[0].map( x => {
              x.value = 0
              return x
            })

            rttdistance[0].map(obj => rttavg.find(x => x.routeId == obj.routeId).value += Math.sqrt(obj.distance)/(ureport[0].find(x => x.routeId = obj.routeId).counter))
            let decisionmatrix = [loadfactor[0].map( x => x.average), headway[0].map(x =>x.average), frequency[0].map(x => x.average), rttavg.map(x => x.value) ]
            let criteriatype = criteria.map(x => x.criteriaType)
  
            let dm = topsis.TOPSIS(decisionmatrix, criteria.map(x => x.weight), criteriatype)
            rttavg.map((x,index) => x.value = dm[index])
            return rttavg

          }).then(data =>this.items = data)
          
    },
    generateEndDate(start){
      this.enddate = this.date.filter( date =>  data > start)
    },
    redirectPage(data){
      //data is the id of the route, url scheme need to be created first
      let lf = db.Report.findAll({
        include:[{
              model: db.LoadFactor,
              as: 'LoadFactors',
              include:[{
                model: db.RouteBusStop,
                as: 'RouteBusStop',
                include:[{
                  model:db.BusStop,
                  as: 'BusStop'
                }],
                where:{
                routeId: data.routeId
              },

              }]
            }],
        attributes:['stringDate'],
        where:{
              reportDate: (this.end == null) ? this.start : {
                [Op.between]:[this.start, this.end]
              }
            }})

      let hw = db.Report.findAll({
        include:[{
              model: db.Headway,
              as: 'Headways',
              include:[{
                model: db.RouteBusStop,
                as: 'RouteBusStop',
                include:[{
                  model:db.BusStop,
                  as: 'BusStop'
                }],
                where:{
                routeId: data.routeId
              }
              }]
            }],
        attributes:['stringDate'],
        where:{
              reportDate: (this.end == null) ? this.start : {
                [Op.between]:[this.start, this.end]
              }
            }})
      let fq = db.Report.findAll({
        include:[{
              model: db.Frequency,
              as: 'Frequencies',
              where:{
                routeId: data.routeId
              }
            }],
        attributes:['stringDate'],
        where:{
              reportDate: (this.end == null) ? this.start : {
                [Op.between]:[this.start, this.end]
              }
            }})
      
      let rtt = db.Report.findAll({
        include:[{
              model: db.RTT,
              as: 'RTTs',
              where:{
                routeId: data.routeId
              }
            }],
        attributes:['stringDate'],
        where:{
              reportDate: (this.end == null) ? this.start : {
                [Op.between]:[this.start, this.end]
              }
            }})
      Promise.all([lf,hw,fq,rtt]).then(([lf,hw,fq,rtt])=>{
        let array = [...JSON.parse(JSON.stringify(lf)),...JSON.parse(JSON.stringify(hw)),...JSON.parse(JSON.stringify(fq)),...JSON.parse(JSON.stringify(rtt))]
        data.report = this.groupBy(array, 'stringDate')
      }).then(() => 
        this.$router.push({name:'DecisionMakerRouteReport', params: {id: data.routeId, report:data}})
      )     
    }
  }
}
</script>

<style>

</style>