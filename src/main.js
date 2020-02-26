import Vue from 'vue'
import App from './App.vue'
import axios from './axios'
import router from '@/router/index.js'
import store from '@/store/index.js'
import VueRx from 'vue-rx'

Vue.config.productionTip = false
Vue.use(VueRx)

new Vue({
  components: { App },
  axios,
  router,
  store,
  template: '<App />'
}).$mount('#app')
