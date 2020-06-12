<template>
  <div>
    <b-form @submit="onCheck" @reset="onReset" v-if="show" >
      <div>
        <b-table-simple hover small caption-top responsive>
          <caption><router-link class="btn btn-secondary" v-bind:to="{name: 'Config'}">Kembali</router-link> Bobot dengan Menggunakan Metode AHP</caption>
          <b-thead head-variant="dark">
          <b-tr>
            <b-th colspan="4" class="mx-auto">Bobot kepentingan antara suatu kriteria terhadap kriteria yang lain</b-th>
            <b-th colspan="2" class="mx-auto">Lebih kuat / lemah</b-th>
            <b-th colspan="1" class="mx-auto">Bobot</b-th>
          </b-tr>
          </b-thead>
          <b-tbody>
          <b-tr>
            <b-td colspan="5">Load Factor terhadap Headway</b-td>
            <b-th colspan="1">
              <b-form-select
                id="input-3"
                v-model="form.modifier[0]"
                :options="important"
                required >
              </b-form-select>
            </b-th>
            <b-td colspan="1">
              <b-form-select
                id="input-3"
                v-model="form.weight[0]"
                :options="weights"
                required>
              </b-form-select>
            </b-td>
          </b-tr>
          <b-tr>
            <b-td colspan="5">Load Factor terhadap Frekuensi</b-td>
            <b-th colspan="1">
              <b-form-select
                id="input-3"
                v-model="form.modifier[1]"
                :options="important"
                required>
              </b-form-select>
            </b-th>
            <b-td colspan="1">
              <b-form-select
                id="input-3"
                v-model="form.weight[1]"
                :options="weights"
                required>
              </b-form-select>
            </b-td>
          </b-tr>
          <b-tr>
            <b-td colspan="5">Load Factor terhadap RTT</b-td>
            <b-td colspan="1">
              <b-form-select
                id="input-3"
                v-model="form.modifier[2]"
                :options="important"
                required>
              </b-form-select>
            </b-td>
            <b-td colspan="1">
              <b-form-select
                id="input-3"
                v-model="form.weight[2]"
                :options="weights"
                required>
              </b-form-select>
            </b-td>
          </b-tr>
          <b-tr>
            <b-td colspan="5">Headway terhadap Frekuensi</b-td>
            <b-td colspan="1">
              <b-form-select
                id="input-3"
                v-model="form.modifier[3]"
                :options="important"
                required>
              </b-form-select>
            </b-td>
            <b-td colspan="1">
              <b-form-select
                id="input-3"
                v-model="form.weight[3]"
                :options="weights"
                required>
            </b-form-select>
            </b-td>
          </b-tr>
          <b-tr>
            <b-td colspan="5">Headway terhadap RTT </b-td>
            <b-td colspan="1">
              <b-form-select
                id="input-3"
                v-model="form.modifier[4]"
                :options="important"
                required>
              </b-form-select>
            </b-td>
            <b-td colspan="1">
              <b-form-select
                id="input-3"
                v-model="form.weight[4]"
                :options="weights"
                required>
              </b-form-select>
            </b-td>
          </b-tr>
          <b-tr>
            <b-td colspan="5">Frekuensi terhadap RTT </b-td>
            <b-td colspan="1">
              <b-form-select
                id="input-3"
                v-model="form.modifier[5]"
                :options="important"
                required>
              </b-form-select>
            </b-td>
            <b-td colspan="1">
              <b-form-select
                id="input-3"
                v-model="form.weight[5]"
                :options="weights"
                required>
              </b-form-select>
            </b-td>
          </b-tr>
          </b-tbody>
          <b-tfoot>
          <b-tr>
            <b-td colspan="7">
            </b-td>
          </b-tr>
          </b-tfoot>
        </b-table-simple>
      </div>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <b-card-text>
        {{message}}
      </b-card-text>
    </b-card>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show" >
      <div>
        <b-table-simple hover small caption-top responsive>
          <caption>Ubah Bobot</caption>
          <b-thead head-variant="dark">
          <b-tr>
            <b-th colspan="3" class="mx-auto">Kriteria</b-th>
            <b-th colspan="2" class="mx-auto">Bobot</b-th>
            <b-th colspan="2" class="mx-auto">Tipe</b-th>
          </b-tr>
          </b-thead>
          <b-tbody>
          <b-tr>
            <b-td colspan="3">Load Factor</b-td>
            <b-td colspan="2">
                <b-form-input
                id="input-1"
                type="text"
                v-model="form.criteria_weight[0]"
                required>
                </b-form-input>
            </b-td>
             <b-td colspan="2">
              <b-form-select
                id="input-3"
                v-model="form.type[0]"
                :options="type"
                required>
              </b-form-select>
            </b-td>
          </b-tr>
            <b-tr>
              <b-td colspan="3">Headway</b-td>
              <b-td colspan="2">
                <b-form-input
                id="input-1"
                type="text"
                v-model="form.criteria_weight[1]"
                required>
                </b-form-input>
              </b-td>
              <b-td colspan="2">
                <b-form-select
                  id="input-3"
                  v-model="form.type[1]"
                  :options="type"
                  required>
                </b-form-select>
              </b-td>
            </b-tr>
            <b-tr>
              <b-td colspan="3">Frekuensi</b-td>
              <b-td colspan="2">
                <b-form-input
                id="input-1"
                type="text"
                v-model="form.criteria_weight[2]"
                required>
                </b-form-input>
              </b-td>
              <b-td colspan="2">
              <b-form-select
                id="input-3"
                v-model="form.type[2]"
                :options="type"
                required>
              </b-form-select>
              </b-td>
            </b-tr>
            <b-tr>
              <b-td colspan="3">RTT</b-td>
              <b-td colspan="2">
                <b-form-input
                id="input-1"
                type="text"
                v-model="form.criteria_weight[3]"
                required>
                </b-form-input>
              </b-td>
              <b-td colspan="2">
                <b-form-select
                  id="input-3"
                  v-model="form.type[3]"
                  :options="type"
                  required>
                </b-form-select>
              </b-td>
            </b-tr>
            </b-tbody>
            <b-tfoot>
            <b-tr>
              <b-td colspan="7">
              </b-td>
            </b-tr>
            </b-tfoot>
        </b-table-simple>
      </div>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import * as AHPHelper from "@/helper/ahp.js"
import fs from 'fs'
import { isNull } from 'util'
const db = require('@/../models/index.js')


let def = {
    message: 'Gunakan form diatas untuk menemukan bobot berdasarkan perbandingan masing-masing kriteria, atau langsung input bobot ke kolom di bawah',
    weight: [1,1,1,1,1,1],
    modifier:[1,1,1,1,1,1],
    criteria:[],
    weights: [1,2,3,4,5,6,7,8,9]
}

export default {
  data() {
    return {
      form: {
        weight: def.weight,
        modifier:def.modifier,
        criteria_weight:[],
        type:[]
      },
      message: def.message,
      weights: [1,2,3,4,5,6,7,8,9],
      type:[{text:'Benefit', value:1},{text:'Cost', value:0}],
      important: [{text: 'Kuat', value: 1}, {text: 'Lemah', value: -1}],
      show: true
    }
  },
  created(){
    db.Criteria.findAll({raw:true}).then(data =>  {
      def.criteria = data
      def.criteria.map(x =>{

        this.form.criteria_weight.push(x.weight)
        this.form.type.push(x.criteriaType)
        
      })
    })
  },
  methods: {
    onCheck(evt) {
      evt.preventDefault()
      let result = AHPHelper.AHP(AHPHelper.generateMatrix(this.form.weight,this.form.modifier))
      this.form.criteria_weight = result.weight
        console.log(result)
        this.message = ('Bobot yang dihasilkan memiliki rasio konsistensi sebesar '
        + result.consistency
        + '. Rasio konsistensi yang dianjurkan adalah <0.1')
      this.show = false
      this.$nextTick(() => {
        this.show = true
      });
    },
    onSubmit(evt) {
        evt.preventDefault()
        let submit = def.criteria.map((x,y) =>{
          x.weight = this.form.criteria_weight[y],
          x.type = this.form.type[y]
          return x
        })
     
        submit.map( x => {
          db.Criteria.update({
            weight : x.weight,
            type : x.criteriaType,
          }, {
            where : {
            id : x.id
            }
          })
        })  
        this.$router.push('/config')
       },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.weight = def.criteria.map(x=> x.weight)
      this.form.type = def.criteria.map(x=> x.criteriaType)
      this.form.modifier = def.modifier
      this.message = def.message
      console.log(this.form)
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped>
b-td {
    white-space: normal !important;
    word-wrap: break-word;
}
b-table-simple{
    table-layout: fixed;
}
</style>>

