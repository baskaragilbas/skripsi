<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <template v-for="field in fields" v-slot:[cell(field.key)]="data">
        <span v-bind:key="field.key">
        <div v-if="field.colType === 'index'">
          {{data.index + 1}}
        </div>
        <div v-else-if="field.colType === 'delete'">
          <button class="btn danger" @click="onClickDelete(data)"><b-icon-trash-fill variant="danger"></b-icon-trash-fill></button>
        </div>
        <div v-else-if="field.colType === 'link'" to="busstop">
          <button class="btn" @click="onClickRedirect(data)">{{data.item[field.key]}}</button>
        </div>
        <div v-else>
          {{data.item[field.key]}}
        </div>
        </span>
    </template>
    </b-table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Table',
  props: {
    fields: Array,
    items: Array,
  },
  methods: {
    cell(key) {
    return `cell(${key})`; // simple string interpolation
    },
    onClickDelete(data) {
      this.$emit('deleteData',data.item)
    },
    onClickRedirect(data) {
      data.preventDefault
      this.$emit('redirect',data.item.id)
    }
  }
}
</script>
