<template>
    <div class="mr-4 ml-4 mt-3">
      <div class="text-left">Tambah Pemberentian bus</div>
      <b-form @submit="onSubmit" inline >
        <div>
          <b-form-input list="input-list" id="input-with-list inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            v-model="route"></b-form-input>
          <!-- <b-form-datalist id="input-list" :options="options"></b-form-datalist> -->
        </div>
        <b-button type="submit" class="mb-2 mr-sm-2 mb-sm-0" variant="primary">Submit</b-button>
      </b-form>
      <div>
        <AppTable :items="items" :fields="fields" @deleteData="deleteData"></AppTable>
      </div>
    </div>
</template>

<script>
import AppTable from '@/components/AppTable.vue'

const db = require('@/../models/index.js')


export default {
  name: 'RouteList',
  components: {
    AppTable
  },
  data() {
    return {
      fields: [
        { key: 'row_number', label: 'No.', colType:"index" },
        { key: 'id', label: 'Id', colType:"text" },
        { key: 'routeName', label: 'Route', colType:"link" },
        { key: 'del_button', label: 'Delete', colType:"delete" }
      ],
      items: [],
      route: '',
      renderComponent: false
    }
  },
  created() {
    db.Route.findAll()
      .then(data => JSON.stringify(data))
      .then(data => this.items = JSON.parse(data))
  },
  methods : {
    onSubmit(evt){
      evt.preventDefault() 
      db.Route.create({
        routeName: this.route
      }).then(data => JSON.stringify(data)).then(data=>{
        this.items.push(JSON.parse(data))
      }).then(data => this.route = '')
    },
    deleteData(data){
      db.Route.destroy({
        where: {
          id: data.id
        }
      }).then(result =>{ this.items = this.items.filter((arr) => arr.id != data.id)})

      this.renderComponent = false
        this.$nextTick(() => {
          this.renderComponent = true
        })
    }
  }

}
</script>