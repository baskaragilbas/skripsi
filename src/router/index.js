import Vue from 'vue'
import VueRouter from 'vue-router'

// Import all needed component
import Home from '@/views/Home.vue'
// Config View
import Config from '@/views/config/Config.vue'
import Config_Edit from '@/views/config/ConfigEdit.vue'
// Bus View
import Route from '@/views/bus/Route.vue'
import RouteList from '@/views/bus/RouteList.vue'
//import BusStopList from '@/views/bus/BusStopList.vue'
import RouteEdit from '@/views/bus/RouteEdit.vue'
import AddBusStop from '@/views/bus/AddBusStop.vue'
// Report View


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/config',
    name: 'Config',
    component: Config
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/config/Config.vue')
  },
  {
    path: '/config/edit',
    name: 'Config_Edit',
    component: Config_Edit
  },
  {
    path: '/route/',
    name: 'Route',
    component: Route,
    children: [
      {
        path: 'list',
        name: 'RouteList',
        component: RouteList
      },
      {
        path: ':id/edit',
        name: 'RouteEdit',
        component: RouteEdit
      },
      // {
      //   path: '/bus/busstop',
      //   name: 'BusStopList',
      //   component: BusStopList
      // },
      {
        path: 'busstop',
        name: 'AddBusStop',
        component: AddBusStop
      }
    ]
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
