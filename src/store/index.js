import Vue from 'vue'
import Vuex from 'vuex'
import page from './modules/page'
import menu from './modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    page,
    menu,
  },
  actions: {
    simpleAlert : {
      root: true, // 전역사용
      handler(namespacedContext, options){
        Vue.swal(options.title)
      }
    },
    ToastAlert : {
      root: true, // 전역사용
      handler(namespacedContext, options){
        const Toast = Vue.swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
          toast.addEventListener('mouseenter', Vue.swal.stopTimer)
          toast.addEventListener('mouseleave', Vue.swal.resumeTimer)
          }
        })
  
        Toast.fire({
          icon: options.icon,
          title: options.title
        })
      }
    },
  }
})

