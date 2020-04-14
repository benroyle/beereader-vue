<template>
  <div class="deleteUser">
    <div v-if="!successful">
      <h2>Delete User</h2>
      <form v-on:submit="handleSubmit">
        <div class="left">
          Username:
        </div>
        <div class="right">
          {{ username }}
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right">
          <button type="submit" class="submitButton" :disabled="loading">Delete this user</button>
          <button type="reset" class="cancelButton" v-on:click="goBack">Cancel</button>
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right errorMsg">
          {{ message }}
        </div>
      </form>
    </div>
    <div v-if="successful">
      <h2>User deleted</h2>
      <p>{{ message }}</p>
      <p>Please <router-link to="/admin">click here</router-link> to return to the Admin section.</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DeleteUser',
    data() {
      return {
        username: '',
        password: '',
        id: '', 
        loading: false,
        successful: false,
        message: ''
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      currentUsers() {
        return this.$store.state.feeds.currentUsers;
      }
    },
    methods: {
      processErrorMsg(text) {
        if (text.message) {
          this.message = text.message;
        } else {
          this.message = text;
        }
        this.successful = false;
      },
      handleSubmit(event) {
        event.preventDefault();
        this.message = '';
        this.loading = true;
        let user = {
          id: this.id,
          username: this.username
        };
        this.$store.dispatch('admin/deleteUser', user)
        .then(
          data => {
            this.loading = false;
            this.successful = true;
            this.message = data.message;
          },
          error => {
            console.log(error);
            this.loading = false;
            let errorMsg =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            this.processErrorMsg(errorMsg);
          }
        );
      },
      goBack() {
        this.$router.push("/admin");
      }
    },
    mounted() {
      if (!this.loggedIn) {
        this.$router.push('/');
      } else {
        if (this.$route.params.id) {
          let users = this.$store.state.admin.adminUsers;
          for (let i = 0; i < users.length; i++) {
            if (users[i].id.toString() === this.$route.params.id) {
              this.username = users[i].username;
              this.id = this.$route.params.id;
            }
          }
        }
      }
    }
  };
</script>