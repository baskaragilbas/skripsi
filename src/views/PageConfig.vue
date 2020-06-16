<template>
  <div class="config">
    <h3>Konfigurasi bobot</h3>
    <br>
    <b-container fluid class="text-light text-center">
      <b-row class="mb-3">
        <b-col>
          <AppTable :items="weight" :fields="fields"></AppTable>
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col md="3" class="ml-md-auto ml-sm-auto p-3">
          <router-link class="btn btn-secondary" v-bind:to="{name: 'ConfigEdit'}">Edit</router-link>
        </b-col>
      </b-row>
    </b-container>  
  </div>
</template>

<script>

import AppTable from '@/components/AppTable.vue';
const db = require('@/../models/index.js')

export default {
  name: 'Config', 
  components: {
    AppTable
  },
  data(){
    return{
      weight: null,
      fields: [
        { key: 'row_number', label: 'No.', colType:"index" },
        { key: 'criteriaName', label: 'Kriteria', colType:"text" },
        { key: 'criteriaType', label: 'Kriteria', colType:"text" },
        { key: 'weight', label: 'Bobot', colType:"text" }
      ]
    }
  },
  created(){
    db.Criteria.findAll({raw:true})
    .then(data =>{
      data.map(x => x.criteriaType = (x.criteriaType == 1) ? 'Benefit':'Cost' )
      this.weight = data
      console.log(this.weight)
    })
  }
}
</script>
