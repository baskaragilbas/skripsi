<template>
  <div>
    <h4>Laporan Rute {{report.routeName}}</h4>
    <b-form inline >
      <div>
        <b-form-select
          class="mb-2 mr-sm-2 mb-sm-0"
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
    <!--Load Factor-->
    <b-table-simple hover small caption-top responsive>
      <caption>Load Factor</caption>
      <b-thead head-variant="dark">
      <b-tr>
        <b-th colspan="4" class="mx-auto">Load Factor</b-th>
        <b-th colspan="3" class="mx-auto">Nilai (Dalam Persen)</b-th>
      </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="loadFactor in loadFactors" v-bind:key="loadFactor.id">
          <b-td colspan="5">{{loadFactor.busStop}}</b-td>
          <b-td colspan="2">{{loadFactor.value}}</b-td>
        </b-tr>
      </b-tbody>      
    </b-table-simple>

    <!--Headway-->
    <b-table-simple hover small caption-top responsive>
      <caption>Headway</caption>
      <b-thead head-variant="dark">
      <b-tr>
        <b-th colspan="4" class="mx-auto">Headway</b-th>
        <b-th colspan="3" class="mx-auto">Nilai (Dalam Menit)</b-th>
      </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="headWay in headWays" v-bind:key="headWay.id">
          <b-td colspan="5">{{headWay.busStop}}</b-td>
          <b-td colspan="2">{{headWay.value}}</b-td>
        </b-tr>
      </b-tbody>      
    </b-table-simple>

    <!--Frequency-->
    <b-table-simple hover small caption-top responsive>
      <caption>Frequency</caption>
      <b-thead head-variant="dark">
      <b-tr>
        <b-th colspan="4" class="mx-auto">Frequency</b-th>
        <b-th colspan="3" class="mx-auto">Nilai (Dalam Unit)</b-th>
      </b-tr>
      </b-thead>
      <b-tbody>
         <b-tr v-for="frequency in sortedFrequencies" v-bind:key="frequency.id">
          <b-td colspan="5">{{frequency.time}}</b-td>
          <b-td colspan="2">{{frequency.value}}</b-td>
        </b-tr>
      </b-tbody>      
    </b-table-simple>

    <!--RTT-->
    <b-table-simple hover small caption-top responsive>
      <caption>RTT</caption>
      <b-thead head-variant="dark">
      <b-tr>
        <b-th colspan="4" class="mx-auto">Hari</b-th>
        <b-th colspan="3" class="mx-auto">Nilai (Dalam Jam)</b-th>
      </b-tr>
      </b-thead>
      <b-tbody>
         <b-tr v-for="rtt in rtts" v-bind:key="rtt.id">
          <b-td colspan="5">{{rtt.day}}</b-td>
          <b-td colspan="2">{{rtt.value}}</b-td>
        </b-tr>
      </b-tbody>      
    </b-table-simple>
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
      selectedDate: null,
      loadFactors: null,
      headWays: null, 
      frequencies: null,
      rtts: null
    }
  },
  computed: {
    sortedFrequencies () {
      const unsorted = [...this.frequencies]
      return unsorted.sort((a, b) => {
        var x = a.time.toLowerCase();
        var y = b.time.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      })
    }
  },
  methods: {
    getSelected(args){
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

      this.frequencies =  [...Object.values({...selectedDate[2].Frequencies})].map(obj => (
        {
          id: obj.id,
          time: obj.time, 
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
    }
  },
  created(){
    console.log({...Object.keys(this.report.report)})
  }
  
}
</script>

<style>

</style>