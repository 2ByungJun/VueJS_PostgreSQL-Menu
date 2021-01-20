import Vue from 'vue'
import Vuex from 'vuex'
import page from './modules/page'
import menu from './modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    page,
    menu,
  }
})