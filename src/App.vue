<template>
  <div id="app">
    <div id="nav">
      <b-card title="Card Title" no-body>
        <b-card-header header-tag="nav">
          <b-nav card-header pills>
            <b-nav-item to="/" exact exact-active-class="active" >ZHome</b-nav-item>
            <b-nav-item to="/config" exact exact-active-class="active">Pengaturan</b-nav-item>
            <b-nav-item to="/route/list" exact exact-active-class="active">Rute</b-nav-item>
          </b-nav>
        </b-card-header>
        <b-card-body class="text-center">
         <router-view/>
        </b-card-body>
      </b-card> 
    </div>  
  </div>
</template>



