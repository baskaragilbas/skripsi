<template>
  <div>
  <b-card no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs>
        <b-nav-item to="/route/list">Rute</b-nav-item>
        <b-nav-item to="/route/busstop">Bus Stop</b-nav-item>
      </b-nav>
    </b-card-header>
      <router-view/>
    <b-card-body >
    </b-card-body>
  </b-card>
</div>
</template>





<script>
export default {
  name: 'Route'
}
</script>
