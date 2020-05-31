<template>
  <div>
    <b-tr>
      <b-td colspan="12" class="mx-auto">
        <router-link v-bind:to="{name: 'ReportForm', params: {id: route.name, route: route}}">
          {{route.name}}
        </router-link>
      </b-td>
    </b-tr>
  </div>
</template>

<script>
export default {
  props: {
    route: {
      type: Object
    }
  }
}
</script>

<style>

</style>