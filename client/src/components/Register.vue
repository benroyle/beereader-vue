<template>
  <div class="contentRow">
    <div class="modalDiv">
      <h1>Register</h1>
      <form v-on:submit="handleRegister">
        <div v-if="!successful">
          <div class="left">
            <label for="username">Username</label>
          </div>
          <div class="right">
            <input type="text" name="username" placeholder="username" v-model="user.username" />
          </div>
          <div class="left">
            <label for="password">Password</label>
          </div>
          <div class="right">
            <input type="password" name="password" placeholder="password" v-model="user.password" />
          </div>
          <div class="left">
            &nbsp;
          </div>
          <div class="right">
            <button type="submit" :disabled="loading">Sign Up</button>
            <span v-show="loading" class="errorMsg">LOADING!!!!!</span>
          </div>
          <div class="left">
            &nbsp;
          </div>
          <div class="right errorMsg">
            {{ message }}
          </div>
        </div>
        <div v-if="successful">
          <h2>Registration complete</h2>
          <p>{{ user.username }} was registered successfully. Please <a href="/app">click here </a> to go to the app.</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from '../models/User';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', ''),
      loading: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
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
        this.loginFailed(errorMsg);
        return false;
      } else {
        return true;
      }
    },
    handleRegister(event) {
      event.preventDefault();
      this.message = '';
      this.loading = true;
      console.log(this.username);
      console.log(this.password);
      if (validate(this.username, this.password) === true) {
        this.$store.dispatch('auth/register', this.user)
        .then(
          data => {
            this.loading = false;
            this.successful = true;
            this.message = data.message;
          },
          error => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            this.loginFailed(this.message);
          }
        );
      }
    },
    loginFailed(text) {
      this.message = text.message;
      this.successful = false;
    }
  }
};
</script>