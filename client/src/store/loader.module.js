const initialState = {
  loading: true
};

const loader = {
  namespaced: true,
  state: initialState,
  actions: {
    begin({ commit }) {
      commit('begun')
    },
    end({ commit }) {
      commit('ended')
    }
  },
  mutations: {
    begun(state) {
      state.loading = true;
    },
    ended(state) {
      state.loading = false;
    }
  }
};

export default loader;