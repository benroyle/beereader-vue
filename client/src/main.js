import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import AsyncComputed from 'vue-async-computed'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'


Vue.config.productionTip = false
Vue.use(VueAxios, axios)

new Vue({
  components: { App },
  axios,
  router,
  store,
  AsyncComputed,
  template: '<App />'
}).$mount('#app')
