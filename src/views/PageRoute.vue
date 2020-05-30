<template>
  <div>
  <b-card no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs>
        <b-nav-item><router-link v-bind:to="{name: 'RouteList'}">Rute</router-link></b-nav-item>
        <b-nav-item><router-link v-bind:to="{name: 'RouteBusStop'}">Bus Stop</router-link></b-nav-item>
      </b-nav>
    </b-card-header>
      <router-view v-bind:key="$route.path"/>
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
