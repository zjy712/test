import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Userinfo: ''
  },
  mutations: {
    setUserinfo(state, data) {
      state.Userinfo = data;
    },
  },
  actions: {
    commitLoginState: ({ commit }, Userinfo) => commit('setUserinfo', Userinfo),
  }
})
