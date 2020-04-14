import AdminService from '../services/admin.service'

const initialState = () => {
  return {
    adminUsers: [],
    adminUser: {}
  }
};

const admin = {
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
      state.adminUsers = users;
    },
    getUsersFailure(state) {
      state.adminUsers = null;
    },
    getUserSuccess(state, user) {
      state.adminUser = user;
    },
    getUserFailure(state) {
      state.adminUser = null;
    },
    editUserSuccess(state, users) {
      state.adminUsers = users;
    },
    editUserFailure(state) {
      state.adminUsers = null;
    },
    deleteUserSuccess(state, users) {
      state.adminUsers = users;
    },
    deleteUserFailure(state) {
      state.adminUsers = null;
    }
  }
};

export default admin;