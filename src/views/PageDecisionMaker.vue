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
                :options="[{text: 'Tanggal Selesai', value: null},...startdate]"
                on:blur="generateEndDate(start)"
                required >
              </b-form-select>
          <b-form-select
                class="mb-2 mr-sm-2 mb-sm-0"
                v-model="end"
                :options="[{text: 'Tanggal Mulai', value: null},...enddate]"
                required >
              </b-form-select>
        </div>

        <b-button type="submit" class="mb-2 mr-sm-2 mb-sm-0" variant="primary">Submit</b-button>
      </b-form>
      <b-row class="mb-3">
        <b-col>
          <AppTable :items="items" :fields="fields"></AppTable>
        </b-col>
      </b-row>
    </b-container>  
  </div>
</template>

<script>
import AppTable from '@/components/AppTable.vue';
const db = require('@/../models/index.js')

export default {
  components: {
    AppTable
  },
  data(){
    return{
      startdate: [],
      start: null,
      enddate: [],
      end: null,
      items: [],
      fields: [
        { key: 'row_number', label: 'No.', colType:"index" },
        { key: 'id', label: 'Id', colType:"text" },
        { key: 'routeName', label: 'Rute', colType:"link" },
        { key: 'priority', label: 'Nilai Prioritas', colType:"delete" }
      ],
    }
  },
  created(){
    db.Report.findAll().then(data=> this.startdate = JSON.parse(JSON.stringify(data)))
  },
  methods:{
    onSubmit(evt){
      evt.preventDefault
    },
    generateEndDate(start){
      this.enddate = this.date.filter( date =>  data > start)
    }
  }
}
</script>

<style>

</style>