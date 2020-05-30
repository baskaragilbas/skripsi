import Vue from 'vue'
import VueRouter from 'vue-router'

// Import all needed component
import Home from '@/views/PageHome.vue'
// Config View
import Config from '@/views/PageConfig.vue'
import ConfigEdit from '@/views/PageConfigEdit.vue'
// Bus View
import Route from '@/views/PageRoute.vue'
import RouteList from '@/components/RouteList.vue'
//import BusStopList from '@/views/bus/BusStopList.vue'
import RouteEdit from '@/views/bus/RouteEdit.vue'
import RouteBusStopAdd from '@/components/RouteBusStopAdd.vue'
// Report View
import Report from '@/views/PageReport.vue'
// Decision Maker View
import DecisionMaker from '@/views/PageDecisionMaker.vue'

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
    name: 'ConfigEdit',
    component: ConfigEdit
  },
  {
    path: '/route',
    name: 'Route',
    component: Route,
    children: [
      {
        path: 'routelist',
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
        name: 'RouteBusStop',
        component: RouteBusStopAdd
      },
    ]
  },
  {
    path: '/report',
    name: 'Report',
    component: Report
  },
  {
    path: '/decisionmaker',
    name: 'DecisionMaker',
    component: DecisionMaker
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
