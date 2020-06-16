<template>
  <div>
    <!-- <h4>Laporan Rute {{route.routeName}}</h4> -->
    <h4>Laporan Rute hardcode</h4>
    <b-form inline >
      <div>
        <b-form-select
          class="mb-2 mr-sm-2 mb-sm-0"
          required >
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
        <b-tr>
          <b-td>aaa</b-td>
          <b-td>aaa</b-td>
        </b-tr>
        <!-- <b-tr v-for="busStop in BusStop" v-bind:key="busStop.id">
          <b-td colspan="5">{{busStop.busStopName}}</b-td>
          <b-td colspan="2">{{busStop.loadFactor}}</b-td>
        </b-tr> -->
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
        <!-- <b-tr v-for="busStop in BusStop" v-bind:key="busStop.id">
          <b-td colspan="5">{{busStop.busStopName}}</b-td>
          <b-td colspan="2">{{busStop.headWay}}</b-td>
        </b-tr> -->
        <b-tr>
          <b-td>aaa</b-td>
          <b-td>aaa</b-td>
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
        <!-- <b-tr v-for="busStop in BusStop" v-bind:key="busStop.id">
          <b-td colspan="5">{{busStop.busStopName}}</b-td>
          <b-td colspan="2">{{busStop.loadFactor}}</b-td>
        </b-tr> -->
        <b-tr>
          <b-td>aaa</b-td>
          <b-td>aaa</b-td>
        </b-tr>
      </b-tbody>      
    </b-table-simple>

    <!--Load Factor-->
    <b-table-simple hover small caption-top responsive>
      <b-tbody>
        <b-tr>
          <b-td colspan="5">RTT</b-td>
          <!-- <b-td colspan="2">{{busStop.RTT}} Jam</b-td> -->
          <b-td colspan="2">hardcode Jam</b-td>
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
    }
  },
}
</script>

<style>

</style>