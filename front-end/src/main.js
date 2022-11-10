import Vue from 'vue'
import App from './App.vue'

// bootstrap 5.x npm import
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

// bootstrap-vue import
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'



import router from './router'
import store from './store'

// bootstrap vue모듈 사용
Vue.use(BootstrapVue)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
