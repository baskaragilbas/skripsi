<template>
  <div>
    <h1>Page Report</h1>
    <ReportList v-bind:routes="db"/>
    <router-view 
    v-bind:key="$route.path" 
    v-on:submitForm="submitForm"/>
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
      db:[]
    }
  },
  created(){
    db.Route.findAll({include:{model:db.BusStop, as:'BusStop', required: true}})
      .then(data=> this.db = (JSON.parse(JSON.stringify(data))))
  },
  methods: {
    submitForm (formData) {
      console.log(formData)
    }
  }
}
</script>

<style>

</style>