import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from '../views/Page.vue'
import Menu from '../views/Menu.vue'
import Copy from '../views/Copy.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Page',
    component: Page
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/copy',
    name: 'Copy',
    component: Copy
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
