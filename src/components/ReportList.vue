<template>
  <div>
    <h3>Daftar Report</h3>
    <b-form>
      <div>
      <b-table-simple hover small caption-top responsive>
        <ReportListItem
          v-for="route in routes"
          v-bind:key="route.routeName"
          v-bind:route="route"/>
      </b-table-simple>
     </div>
    </b-form> 

  </div>
</template>

<script>
import ReportListItem from '@/components/ReportListItem.vue'

export default {
  components: {
    ReportListItem
  },
  props: {
    routes: {
      required: true,
      type: Array
    }
  }
}
</script>

<style>

</style>