<template>
  <div>
    <h1>Page Report</h1>
    <div>
      <label for="datepicker">Laporan tanggal :</label>
      <b-form-datepicker id="datepicker" v-model="reportDate" class="mb-2"></b-form-datepicker>
    </div>
    <div v-if="reportDate">
      <ReportList v-bind:routes="db"/>
      <router-view 
      v-bind:key="$route.path" 
      v-on:submitForm="submitForm"/>
    </div>
    <div>
      <b-alert
      :show="dismissCountDown"
      dismissible
      variant="success"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <p>Input Berhasil</p>
    </b-alert>
    </div>
  </div>
</template>

<script>
import ReportList from '@/components/ReportList.vue'
const db = require('@/../models/index.js')

export default {
  components:{
    ReportList
  },
  props: {
    route: {
      type: Object
    }
  },
  data () {
    return {
      db:[],
      reportDate: null,
      dismissSecs: 3,
      dismissCountDown: 0
    }
  },
  created(){
    db.Route.findAll({include:{model:db.BusStop, as:'BusStop', required: true}})
      .then(data=> this.db = (JSON.parse(JSON.stringify(data))))
    console.log('halo')
  },
  methods: {
    submitForm (formData) {
      let frequency = []
      Object.keys(formData.frequency).forEach(key => frequency.push({time:key, value:formData.frequency[key]}))
      

      db.Report.findOrCreate({where:{reportDate: this.reportDate}}).spread(report=>{
        Object.keys(formData.loadFactor).forEach(key => {
          db.LoadFactor.findOne({where:{reportID:report.id,routeBusStopID:key}}).then(token =>{
            if(token == null){
              db.LoadFactor.create({value:formData.loadFactor[key]}).then(result =>{
                report.addLoadFactor(result)
                db.RouteBusStop.findByPk(key).then(data =>{
                  data.addLoadFactor(result)
                })
              })
            }else{
              token.update({value:formData.loadFactor[key]}).then(result =>{
                report.addLoadFactor(result)
                db.RouteBusStop.findByPk(key).then(data =>{
                  data.addLoadFactor(result)
                })
              })
            }
          })
          db.Headway.findOne({where:{reportID:report.id,routeBusStopID:key}}).then(token =>{
            if(token == null){
              db.Headway.create({value:formData.headWay[key]}).then(result =>{
                report.addHeadway(result)
                db.RouteBusStop.findByPk(key).then(data =>{
                  data.addHeadway(result)
                })
              })
            }else{
              token.update({value:formData.headWay[key]})
            }
          })
        })
        db.Route.findOne({where:{routeName:formData.routeName}}).then(route =>{
          frequency.map(obj =>{
            db.Frequency.findOne({where:{reportID:report.id,routeID:route.id,time:obj.time}}).then(result =>{
              if(result==null){
                db.Frequency.create(obj).then(data =>{
                  report.addFrequency(data)
                  route.addFrequency(data)
                })
              }else{
                result.update({value:obj.value})
              }
            })
          })
          db.RTT.findOne({where:{reportID:report.id,routeID:route.id}}).then(result=>{
            if(result==null){
              db.RTT.create({value:formData.rtt}).then(rtt =>{
                report.addRTT(rtt)
                route.addRTT(rtt)
              })
            }else{
              result.update({value:formData.rtt})
            }
          })
          
        })
      }).then(()=> this.showAlert())
    },
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>

<style>

</style>