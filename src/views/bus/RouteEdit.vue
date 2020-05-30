<template>
    <div class="mr-4 ml-4 mt-3">
      <div class="text-left">Tambah Pemberentian bus</div>
      <b-form @submit="onSubmit" inline >
        <div>
          <b-form-input list="input-list" id="input-with-list inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            v-model="busstop"></b-form-input>
          <b-form-datalist id="input-list" :options="list"></b-form-datalist>
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
const { Op } = require("sequelize");



export default {
  name: 'AddBusStop',
  components: {
    AppTable
  },
  props: {
    id: Number
  },
  data() {
    return {
      fields: [
        { key: 'row_number', label: 'No.', colType:"index" },
        { key: 'id', label: 'Id', colType:"text" },
        { key: 'busStopName', label: 'Bus Stop', colType:"text" },
        { key: 'del_button', label: 'Delete', colType:"delete" }
      ],
      items: [],
      list:[],
      busstop: '',
      renderComponent: false
    }
  },
  created() {
    db.Route.findByPk(this.$route.params.id, {
      include: [
        {
            model: db.BusStop,
            as: 'BusStop'
        }
    ]
    }).then(data => data.getBusStop({attributes:{exclude:['RouteBusStop']}})).then(data => JSON.stringify(data))
      .then(data => this.items = JSON.parse(data))
    db.BusStop.findAll().then(data => JSON.parse(JSON.stringify(data)).map( x => this.list.push(x.busStopName)))
    },
  methods : {
    onSubmit(evt){
      evt.preventDefault() 
      db.BusStop.findOrCreate({
        where: {busStopName: this.busstop}
      }).then(data =>{
          this.items.push(JSON.parse(JSON.stringify(data))[0])
          db.Route.findOne({ where:{ id : this.$route.params.id}})
            .then(result => result.addBusStop(data))
        })
    },
    deleteData(data){
      db.Route.findByPk(this.$route.params.id)
      .then(result =>{ 
        this.items = this.items.filter((arr) => arr.id != data.id)
        result.removeBusStop(data.id)
      })

      this.renderComponent = false
        this.$nextTick(() => {
          this.renderComponent = true
        })
    }
  }

}
</script>