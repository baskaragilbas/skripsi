<template>
  <div id="app">
    <div id="nav">
      <TheNav/>
      <b-card title="Card Title" no-body>
        <b-card-body class="text-center">
         <router-view/>
        </b-card-body>
      </b-card> 
    </div>  
  </div>
</template>

<script>
import TheNav from '@/components/TheNav'

export default {
  components: {
    TheNav
  }
}
</script>

