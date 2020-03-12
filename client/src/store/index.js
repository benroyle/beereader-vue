import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.module'
import feeds from './feeds.module'
import loader from './loader.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    feeds,
    loader
  }
})