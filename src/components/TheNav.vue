<template>
  <div id="nav">
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header pills>
        <b-nav-item exact exact-active-class="active" >
          <router-link v-bind:to="{name: 'Home'}">Home</router-link>
        </b-nav-item>
        <b-nav-item exact exact-active-class="active">
          <router-link v-bind:to="{name: 'Config'}">Pengaturan</router-link>  
        </b-nav-item>
        <b-nav-item exact exact-active-class="active">
          <router-link v-bind:to="{name: 'RouteList'}">Rute</router-link>  
        </b-nav-item>
        <b-nav-item exact exact-active-class="active">
          <router-link v-bind:to="{name: 'Report'}">Report</router-link>  
        </b-nav-item>
        <b-nav-item exact exact-active-class="active">
          <router-link v-bind:to="{name: 'DecisionMaker'}">Decision Maker</router-link>  
        </b-nav-item>
      </b-nav>
    </b-card-header>
  </b-card> 
</div>  
</template>

<script>
export default {

}
</script>

<style>

</style>