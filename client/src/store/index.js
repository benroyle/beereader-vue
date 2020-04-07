import Vue from 'vue'
import Vuex from 'vuex'

import admin from './admin.module'
import auth from './auth.module'
import feeds from './feeds.module'
import loader from './loader.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  	admin,
    auth,
    feeds,
    loader
  }
})