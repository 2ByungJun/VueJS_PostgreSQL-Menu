import Vue from 'vue'
import Vuex from 'vuex'
import page from './page'
import menu from './menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    page,
    menu,
  }
})
