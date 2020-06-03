<template>
  <div>
    <div class="text-left">Pilih rute</div>
    <b-form>
      <div>
         <b-form-select 
          v-model="selected" 
          v-bind:options="options"
          v-on:change="getSelected"></b-form-select>
      </div>
    </b-form>
    <br/>
  </div>
</template>

<script>
export default {
  props: {
    routes: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      selected: null,
    }
  },

  computed: {
    options () {
      return this.routes.map((item) => {
        const value = item.id
        const text = item.routeName

        return {
          value: value, 
          text: text
        }
      })
    }
  },

  methods: {
    getSelected(args){
      const selectedRoute = {...this.routes.filter(
        route => {
          return route.id === args
        }
      )}

      this.$router.push({name: 'ReportForm', params: {id: selectedRoute[0].routeName, route: selectedRoute[0]}})
    }
  }
}
</script>

<style>

</style>