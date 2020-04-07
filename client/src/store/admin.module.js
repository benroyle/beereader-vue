import AdminService from '../services/admin.service'

const initialState = () => {
  return {
    currentUsers: [],
    currentUser: {}
  }
};

const users = {
  namespaced: true,
  state: initialState(),
  actions: {
    getUsers({ commit }) {
      return AdminService.getUsers().then(
        users => {
          commit('getUsersSuccess', users);
          return Promise.resolve(users);
        },
        error => {
          commit('getUsersFailure');
          return Promise.reject(error);
        }
      );
    },
   getUser({ commit }, user) {
      return AdminService.getUser(user).then(
        user => {
          commit('getUserSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('getUserFailure');
          return Promise.reject(error);
        }
      );
    },
    addUser({ commit }, user) {
      return AdminService.addUser(user).then(
        users => {
          commit('addUserSuccess', users);
          return Promise.resolve(users);
        },
        error => {
          commit('addUserFailure');
          return Promise.reject(error);
        }
      );
    },
    editUser({ commit }, user) {
      return AdminService.editUser(user).then(
        users => {
          commit('editUserSuccess', users);
          return Promise.resolve(users);
        },
        error => {
          commit('editUserFailure');
          return Promise.reject(error);
        }
      );
    },
    deleteUser({ commit }, user) {
      return AdminService.deleteUser(user).then(
        users => {
          commit('deleteUserSuccess', users);
          return Promise.resolve(users);
        },
        error => {
          commit('deleteUserFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    getUsersSuccess(state, users) {
      state.currentUsers = users;
    },
    getUsersFailure(state) {
      state.currentUsers = null;
    },
    getUserSuccess(state, user) {
      state.currentUser = user;
    },
    getUserFailure(state) {
      state.currentUser = null;
    },
    addUserSuccess(state, users) {
      state.currentUsers = users;
    },
    addUserFailure(state) {
      state.currentUsers = null;
    },
    editUserSuccess(state, users) {
      state.currentUsers = users;
    },
    editUserFailure(state) {
      state.currentUsers = null;
    },
    deleteUserSuccess(state, users) {
      state.currentUsers = users;
    },
    deleteUserFailure(state) {
      state.currentUsers = null;
    }
  }
};

export default users;