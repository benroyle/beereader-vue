import axios from 'axios';

export const adminService = {
  getUsers,
  getUser,
  editUser,
  deleteUser,
  addUser
};

async function getUsers() {
  const config = {
    headers: {
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/json; charset=utf-8',
      'X-Requested-With': 'XmlHttpRequest'
    }
  }
  const userItems = await axios.get('http://192.168.28.38:4000/beereader-vue/adminGetUsers/', config)
  .then((response) => (response.data))
  .then((response) => {
    if (response !== undefined) {
      return response;
    } else {
      return false;
    }
  });
  if (userItems !== undefined) {
    return userItems;
  }
}

async function getUser(id) {
  const config = {
    headers: {
      'content-type': 'application/json; charset=utf-8'
    }
  }
  const userItems = await axios.post('http://192.168.28.38:4000/beereader-vue/adminGetUser/', { 'id': id }, config)
  .then((response) => (response.data))
  .then((response) => {
    if (response !== undefined) {
      return response;
    } else {
      return false;
    }
  });
  if (userItems !== undefined) {
    return userItems;
  }
}

async function editUser(id, username, password, role) {
  const config = {
    headers: {
      'content-type': 'application/json; charset=utf-8'
    }
  }
  const userEdit = await axios.post('http://192.168.28.38:4000/beereader-vue/adminEditUser/', { 'id': id, 'username': username, 'password': password, 'role': role }, config)
  .then((response) => (response.data))
  .then((response) => {
    if (response !== undefined) {
      return response;
    } else {
      return false;
    }
  });
  if (userEdit !== undefined) {
    return userEdit;
  }
}

async function deleteUser(id) {
  const config = {
    headers: {
      'content-type': 'application/json; charset=utf-8'
    }
  }
  const userDelete = await axios.post('http://192.168.28.38:4000/beereader-vue/adminDeleteUser/', { 'id': id }, config)
  .then((response) => (response.data))
  .then((response) => {
    if (response !== undefined) {
      return response;
    } else {
      return false;
    }
  });
  if (userDelete !== undefined) {
    return userDelete;
  }
}

async function addUser(username, password, role) {
  const config = {
    headers: {
      'content-type': 'application/json; charset=utf-8'
    }
  }
  const userAdd = await axios.post('http://192.168.28.38:4000/beereader-vue/adminAddUser/', { 'username': username, 'password': password, 'role': role }, config)
  .then((response) => (response.data))
  .then((response) => {
    if (response !== undefined) {
      return response;
    } else {
      return false;
    }
  });
  if (userAdd !== undefined) {
    return userAdd;
  }
}
