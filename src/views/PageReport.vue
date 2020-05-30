<template>
  <div>
    <h1>Page Report</h1>

    <b-form>
      <div>
        <!--Frequency-->
        <b-table-simple hover small caption-top responsive>
          <caption>Frequency</caption>
          <b-thead head-variant="dark">
          <b-tr>
            <b-th colspan="4" class="mx-auto">Jam</b-th>
            <b-th colspan="3" class="mx-auto">Nilai</b-th>
          </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-for="time in times" v-bind:key="time">
              <b-td colspan="5">{{time}}</b-td>
              <b-td colspan="2">
                  <b-form-input
                  id="input-1"
                  type="text"
                  v-model="form.frequency[time]"
                  required>
                  </b-form-input>
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
         <!--RTT-->
        <b-table-simple hover small caption-top responsive>
          <caption>RTT</caption>
          <b-thead head-variant="dark">
          <b-tr>
            <b-th colspan="4" class="mx-auto">Waktu Tempuh</b-th>
            <b-th colspan="3" class="mx-auto">Nilai</b-th>
          </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-td colspan="5">
                <b-form-input
                  id="input-1"
                  type="text"
                  required>
                </b-form-input>
              </b-td>
              <b-td colspan="2">
                <b-form-input
                  id="input-1"
                  type="text"
                  required>
                </b-form-input>
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
      <b-button type="submit" variant="primary" @click.prevent="logmodel">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  props: {
    route: {
      type: Object
    }
  },

  data () {
    return {
      form: {
        loadFactor: null,
        headWay: null,
        frequency: { // make sure every null is cleared by a value when submitted.
          '05.00-05.59': null,
          '06.00-06.59': null,
          '07.00-07.59': null,
          '08.00-08.59': null,
          '09.00-09.59': null,
          '10.00-10.59': null,
          '11.00-11.59': null,
          '12.00-12.59': null,
          '13.00-13.59': null,
          '14.00-14.59': null,
          '15.00-15.59': null,
          '16.00-16.59': null,
          '17.00-17.59': null,
          '18.00-18.59': null,
          '19.00-19.59': null,
          '20.00-20.59': null,
          '21.00-21.59': null,
        },
        rtt: null
      },
      times: [
        '05.00-05.59',
        '06.00-06.59',
        '07.00-07.59',
        '08.00-08.59',
        '09.00-09.59',
        '10.00-10.59',
        '11.00-11.59',
        '12.00-12.59',
        '13.00-13.59',
        '14.00-14.59',
        '15.00-15.59',
        '16.00-16.59',
        '17.00-17.59',
        '18.00-18.59',
        '19.00-19.59',
        '20.00-20.59',
        '21.00-21.59',
      ]
    }
  },

  methods: {
    logmodel() {
      console.log(this.form)
    }
  }
}
</script>

<style>

</style>