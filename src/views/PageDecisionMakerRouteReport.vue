<template>
  <div>
    <h4>Laporan Rute {{report.routeName}}</h4>
    <b-form inline >
      <b-button 
      @click.prevent="$router.push({name: 'DecisionMaker'})" 
      class="mb-2 mr-sm-2 mb-sm-0" 
      variant="secondary">Kembali</b-button>
      <div>
        <b-form-select
          class="mb-4 mr-sm-2 mb-sm-0"
          v-model="selectedDate"
          :options="[...reportDate]"
          @change="getSelected"
          required >
          <template v-slot:first>
            <b-form-select-option :value="null" disabled>-- Pilih Tanggal --</b-form-select-option>
          </template>
        </b-form-select>
      </div>
    </b-form>
    <br>
   <div v-show="!!selectedDate" style="overflow: auto; height: 70vh; padding: 0 20px">
    <!--Load Factor-->
    <b-table-simple hover small caption-top responsive>
      <caption><h5>Load Factor</h5></caption>
      <b-thead head-variant="dark">
      <b-tr>
        <b-th colspan="4" class="mx-auto">Load Factor</b-th>
        <b-th colspan="3" class="mx-auto">Nilai (Dalam Persen)</b-th>
      </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="loadFactor in loadFactors" v-bind:key="loadFactor.id">
          <b-td colspan="4">{{loadFactor.busStop}}</b-td>
          <b-td colspan="3">{{loadFactor.value}}</b-td>
        </b-tr>
      </b-tbody>      
    </b-table-simple>

    <!--Headway-->
    <b-table-simple hover small caption-top responsive>
      <caption><h5>Headway</h5></caption>
      <b-thead head-variant="dark">
      <b-tr>
        <b-th colspan="4" class="mx-auto">Headway</b-th>
        <b-th colspan="3" class="mx-auto">Nilai (Dalam Menit)</b-th>
      </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="headWay in headWays" v-bind:key="headWay.id">
          <b-td colspan="4">{{headWay.busStop}}</b-td>
          <b-td colspan="3">{{headWay.value}}</b-td>
        </b-tr>
      </b-tbody>      
    </b-table-simple>

    <!--Frequency-->
    <b-table-simple hover small caption-top responsive>
      <caption><h5>Frequency</h5></caption>
      <b-thead head-variant="dark">
      <b-tr>
        <b-th colspan="4" class="mx-auto">Frequency</b-th>
        <b-th colspan="3" class="mx-auto">Nilai (Dalam Unit)</b-th>
      </b-tr>
      </b-thead>
      <b-tbody>
         <b-tr v-for="frequency in sortedFrequencies" v-bind:key="frequency.id">
          <b-td colspan="4">{{frequency.time}}</b-td>
          <b-td colspan="3">{{frequency.value}}</b-td>
        </b-tr>
      </b-tbody>      
    </b-table-simple>

    <!--RTT-->
    <b-table-simple hover small caption-top responsive>
      <caption><h5>RTT</h5></caption>
      <b-thead head-variant="dark">
      <b-tr>
        <b-th colspan="4" class="mx-auto">Hari</b-th>
        <b-th colspan="3" class="mx-auto">Nilai (Dalam Jam)</b-th>
      </b-tr>
      </b-thead>
      <b-tbody>
         <b-tr v-for="rtt in rtts" v-bind:key="rtt.id">
          <b-td colspan="4">{{rtt.day}}</b-td>
          <b-td colspan="3">{{rtt.value}}</b-td>
        </b-tr>
      </b-tbody>      
    </b-table-simple>
   </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number
    },
    report: {
      type: Object
    }
  },
  data () {
    return {
      reportDate: Object.keys(this.report.report),
      loadFactors: null,
      headWays: null, 
      frequencies: null,
      selectedDate: null,
      rtts: null
    }
  },
  computed: {
    sortedFrequencies () {
      if(this.frequencies){
        const unsorted = [...this.frequencies]
        return unsorted.sort((a, b) => {
          var x = a.time.toLowerCase();
          var y = b.time.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        })
      }
    }
  },
  methods: {
    getSelected(args){
      this.showFlag = true
      const selectedDate = this.report.report[args]
      this.loadFactors = [...Object.values({...selectedDate[0].LoadFactors})].map(obj => (
        {
          id: obj.RouteBusStop.BusStop.id,
          busStop: obj.RouteBusStop.BusStop.busStopName,
          value: obj.value
        }
      ))

      this.headWays =  [...Object.values({...selectedDate[1].Headways})].map(obj => (
        {
          id: obj.RouteBusStop.BusStop.id,
          busStop: obj.RouteBusStop.BusStop.busStopName,
          value: obj.value
        }
      ))

      this.rtts =  [...Object.values({...selectedDate[3].RTTs})].map(obj => (
        {
          id: obj.id,
          day: obj.day, 
          value: obj.value
        }
      ))

      this.frequencies =  [...Object.values({...selectedDate[2].Frequencies})].map(obj => (
        {
          id: obj.id,
          time: obj.time, 
          value: obj.value
        }
      ))
    }
  },
  created(){
    console.log({...Object.keys(this.report.report)})
  }
  
}
</script>

<style>

</style>