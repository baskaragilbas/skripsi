<template>
  <div>
    <h1>Page Report</h1>
    <ReportList v-bind:routes="dbmock"/>
    <router-view v-bind:key="$route.path"/>
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
      dbmock: [
        {
          'name': 'route1'
        },
        {
          'name': 'route2'
        }
      ],

      db:[]
    }
  },
  created(){
    db.Route.findAll({include:{model:db.BusStop, as:'BusStop', required: true}})
      .then(data=> this.db = (JSON.parse(JSON.stringify(data))))
  },
}
</script>

<style>

</style>