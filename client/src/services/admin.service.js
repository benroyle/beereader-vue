import axios from 'axios'

const API_URL = 'http://localhost:8081/beereader-vue/';

class AdminService {
  getUsers(userid) {
    return axios.get(API_URL + 'adminGetUsers')
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
  addUser(feed) {
    return axios.post(API_URL + 'adminAddUser', {
      sitename: feed.sitename,
      siteurl: feed.siteurl,
      userid: feed.userid
    })
    .then(response => {
      return response.data;
    });
  }
  editUser(feed) {
    return axios.post(API_URL + 'adminEditUser', {
      sitename: feed.sitename,
      siteurl: feed.siteurl,
      id: feed.id,
      userid: feed.userid
    })
    .then(response => {
      return response.data;
    });
  }
  deleteUser(feed) {
    return axios.post(API_URL + 'adminDeleteUser', {
      sitename: feed.sitename,
      siteurl: feed.siteurl,
      id: feed.id,
      userid: feed.userid
    })
    .then(response => {
      return response.data;
    });
  }
};

export default new AdminService();
