<template>
  <div class="editUser">
    <div v-if="!successful">
      <h2>Edit User</h2>
      <form v-on:submit="handleSubmit">
        <div class="left">
          Username:
        </div>
        <div class="right">
          <input type="text" name="username" id="username" placeholder="username" v-model="username" />
        </div>
        <div class="left">
          Password:
        </div>
        <div class="right">
          <input type="text" name="password" id="password" placeholder="password" v-model="password" />
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right">
          <button type="submit" class="submitButton" :disabled="loading">Save changes</button>
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
      <h2>User edited</h2>
      <p>{{ message }}</p>
      <p>Please <router-link to="/admin">click here</router-link> to return to the Admin section.</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EditUser',
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
      validate(username) {
        let errorMsg = '';
        if ((username === undefined) || (username === '')) {
          errorMsg += "Username field is empty. ";
        }
        if (errorMsg !== '') {
          errorMsg += "Please complete the form and try again.";
          this.processErrorMsg(errorMsg);
          return false;
        } else {
          return true;
        }
      },
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
        if (this.validate(this.username) === true) {
          let user = {
            id: this.id,
            username: this.username,
          };
          if ((this.password !== undefined) && (this.password !== '')) {
            user.password = this.password;
          }
          console.log(user);
          this.$store.dispatch('admin/editUser', user)
          .then(
            data => {
              console.log("done");
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
        }
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