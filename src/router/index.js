import Vue from 'vue'
import Router from 'vue-router'

import Home from 'components/Home'
import EmplDetails from 'components/EmplDetails'
import ListingByOrg from 'components/ListingByOrg'

Vue.use(Router)
export default new Router({
  routes: [
    { name: 'home', path: '/', component: Home },
    { path: '/e/', redirect: '/' },
    { path: '/e/:id', component: EmplDetails },
    { name: 'orgs', path: '/e/orgs/:org', component: ListingByOrg },
    { name: 'byName', path: '/e/lname/:letter', component: ListingByOrg }
  ]
})
