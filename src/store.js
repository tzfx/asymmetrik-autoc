import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * Application-wide state storage.
 */
export default new Vuex.Store({
  state: {
    candidates: [],
    input: '',
    output: ''
  },
  mutations: {
    clearCandidates(state) {
      state.candidates = [];
    },
    clearOutput(state) {
      state.output = '';
    },
    setCandidates(state, candidates) {
      state.candidates = candidates;
    },
    updateOutput(state, word) {
      state.output = state.output + word;
    }
  }
})
