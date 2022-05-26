import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 1
    Tasks: [{id: 'ID',comment: 'コメント', situation: '状態'}]
  },
  getters: { // 2
    Tasks: function(state){
      return state.Tasks;
    }
    // Tasks: state => state.Tasks
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