<template>
  <div>
    <h3>Page Report</h3>
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
      .then(data=> this.db = (JSON.parse(JSON.stringify(data)))).then(data => console.log(data))
  },
  methods: {
    submitForm (formData) {
      let frequency = []
      let rtt = []
      Object.keys(formData.frequency).forEach(key => frequency.push({time:key, value:formData.frequency[key]}))
      Object.keys(formData.rtt).forEach(key => rtt.push({day:key, value:formData.rtt[key]}))
      

      db.Report.findOrCreate({where:{reportDate: this.reportDate,stringDate: this.reportDate}}).spread(report=>{
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
          rtt.map(obj =>{
            let split = obj.value.split(':')
            let minute = (+split[0])*60 +(+split[1]) 
            obj.minute = minute 
            db.RTT.findOne({where:{reportID:report.id,routeID:route.id,day:obj.day}}).then(result =>{
              if(result==null){
                db.RTT.create(obj).then(data =>{
                  report.addRTT(data)
                  route.addRTT(data)
                })
              }else{
                result.update({value:obj.value, day:obj.day, minute:obj.minute})
              }
            })
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