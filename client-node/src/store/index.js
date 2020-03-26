import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from '../modules/auth.module'
import { subscription } from '../modules/subscription.module'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    subscription
  }
})
