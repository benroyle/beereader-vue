<template>
  <div class="contentRow">
    <div class="modalDiv">
      <h1>Login</h1>
      <form v-on:submit="handleSubmit">
        <div v-if="!successful">
          <div class="left">
            <label for="username">Username:</label>
          </div>
          <div class="right">
            <input type="text" name="usernameField" placeholder="username" v-model="user.username" />
          </div>
          <div class="left">
            <label for="password">Password:</label>
          </div>
          <div class="right">
            <input type="password" name="passwordField" placeholder="password" v-model="user.password" />
          </div>
          <div class="left">
            &nbsp;
          </div>
          <div class="right">
            <button type="submit" :disabled="loading">Log in</button>
          </div>
          <div class="left">
            &nbsp;
          </div>
          <div class="right errorMsg">
            {{ message }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import User from '../models/User'

  export default {
    name: 'Login',
    data() {
      return {
        user: new User('', ''),
        loading: false,
        successful: false,
        message: ''
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    created() {
      if (this.loggedIn) {
        this.$router.push('/app');
      }
    },
    methods: {
      validate(username, password) {
        let errorMsg = '';
        if ((username === undefined) || (username === '')) {
          errorMsg += "Username field is empty. ";
        }
        if ((password === undefined) || (password === '')) {
          errorMsg += "Password field is empty. ";
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
        this.message = text.message;
        this.successful = false;
        delete localStorage.token;
      },
      handleSubmit(event) {
        event.preventDefault();
        this.message = '';
        this.loading = true;
        if (this.validate(this.user.username, this.user.password) === true) {
          this.$store.dispatch('auth/login', this.user)
          .then(
            data => {
              this.loading = false;
              this.successful = true;
              this.$router.push('/app');
            },
            error => {
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
    }
  }
</script>