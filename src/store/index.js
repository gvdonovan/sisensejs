import Vue from 'vue'
import Vuex from 'vuex'
import SisenseModule from './modules/sisense'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'ResMan Insights',
  },
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    sisense: SisenseModule
  }
})
