import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: [
    'user'
  ]
})

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {},
  getters: {},
  modules: {
    user
  },
  plugins: [vuexLocal.plugin]
})
