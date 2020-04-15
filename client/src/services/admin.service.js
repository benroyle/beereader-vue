import axios from 'axios'

const API_URL = 'http://localhost:8081/beereaderServer/';

class AdminService {
  getUsers(userid) {
    return axios.post(API_URL + 'adminGetUsers')
    .then(response => {
      return response.data;
    });
  }
  getUser(userid) {
    return axios.post(API_URL + 'adminGetUser', {
      userid: userid
    })
    .then(response => {
      return response.data;
    });
  }
  editUser(user) {
    let userEdit = {
      username: user.username,
      id: user.id
    };
    if (user.password) {
      userEdit.password = user.password;
    }
    return axios.post(API_URL + 'adminEditUser', userEdit)
    .then(response => {
      return response.data;
    });
  }
  deleteUser(user) {
    return axios.post(API_URL + 'adminDeleteUser', {
      username: user.username,
      id: user.id
    })
    .then(response => {
      return response.data;
    });
  }
};

export default new AdminService();
