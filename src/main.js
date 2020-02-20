import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router.js'
import store from './store.js'

Vue.config.productionTip = false

new Vue({
  components: { App },
  router,
  store,
  template: '<App />'
}).$mount('#app')
