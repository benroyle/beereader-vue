<template>
  <div class="adminHome">
    <h2>Admin Actions</h2>
    <form v-if="adminUsers.length > 0" v-on:submit="handleSubmit">
      <div class="left">
        User:
      </div>
      <div class="right">
        <select name="userSelecter" id="userSelecter" v-model="selected">
          <option disabled value="">Please select one</option>
          <option v-for="(user,index) in adminUsers" :key="index" :value="user.id">{{user.username}}</option>
        </select>
      </div>
      <div class="left">
        &nbsp;
      </div>
      <div class="right">
        <button v-on:click="buttonClicked('editUser')">Edit user</button>
        <button v-on:click="buttonClicked('deleteUser')">Delete user</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'AdminHome',
    data() {
      return {
        selected: ''
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
      adminUsers() {
        return this.$store.state.admin.adminUsers;
      },
      isLoggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      isAdmin() {
        if (this.currentUser && this.currentUser.roles) {
          return this.currentUser.roles.includes('ROLE_ADMIN');
        } else {
          return false;
        }
      }
    },
    methods: {
      getUsers() {
        this.$store.dispatch('admin/getUsers')
        .then(
          () => {
            //console.log("gotUsers");
          },
          error => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            console.log(this.message);
          }
        );
      },
      buttonClicked(action) {
        if ((action === "editUser") || (action === "deleteUser")) {
          if (this.selected !== "") {
            this.$router.push("/admin/" + action + "/" + this.selected);
          }
        } else {
          this.$router.push("/admin/" + action);
        }
      },
      handleSubmit(event) {
        event.preventDefault();
      }
    },
    mounted() {
      if ((this.isLoggedIn) && (this.isAdmin)) {
        this.getUsers();
      } else {
        this.$router.push('/');
      }
    }
  };
</script>