<template>
  <div class="config">
    <h3>Konfigurasi bobot</h3>
    <b-container fluid class="text-light text-center">
      <b-row class="mb-3">
        <b-col>
          <Table :items="weight" :fields="fields"></Table>
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col md="3" class="ml-md-auto ml-sm-auto p-3">
          <b-button to="./config/edit">I am a Link</b-button>
        </b-col>
      </b-row>
    </b-container>
    
    
  </div>
</template>

<script>

import Table from '@/components/Table.vue';
import json from '@/db/weight.json'

export default {
  name: 'Config', 
  components: {
    Table
  },
  data(){
    return{
      weight: json,
      fields: [
        { key: 'row_number', label: 'No.', colType:"index" },
        { key: 'criteria', label: 'Kriteria', colType:"text" },
        { key: 'weight', label: 'Bobot', colType:"text" },
        { key: 'delete', label: 'Bobot', colType:"delete" }
      ]
    }
  }
}
</script>
