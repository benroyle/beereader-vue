import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import router from './router/index.js'
import store from './store/index.js'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
  components: { App },
  axios,
  router,
  store,
  template: '<App />'
}).$mount('#app')
