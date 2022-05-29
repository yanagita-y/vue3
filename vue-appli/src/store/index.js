import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 1
    Tasks: []
  },
  getters: { // 2
    Tasks: function(state){
      return state.Tasks;
    }
  },
  mutations: { // 3
    setTasks: function(state, Tasks){
      state.Tasks = Tasks
    }
  },
  actions: { // 4
    getTasks: function({ commit }, Tasks ) {
      commit('setTasks', Tasks)
    }
  },
  modules: {
  }
})