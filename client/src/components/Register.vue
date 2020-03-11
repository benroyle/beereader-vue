<template>
  <div class="contentRow">
    <div class="modalDiv" v-if="!successful">
      <h1>Register</h1>
      <form v-on:submit="handleSubmit">
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
      </form>
    </div>
    <div class="modalDiv" v-if="successful">
      <h2>Registration complete</h2>
      <p>{{ message }}</p>
      <p>Please <router-link to="/">click here</router-link> to login.</p>
    </div>
  </div>
</template>

<script>
import User from '../models/User'

export default {
  name: 'Register',
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
        this.validationFailed(errorMsg);
        return false;
      } else {
        return true;
      }
    },
    validationFailed(text) {
      this.message = text.message;
      this.successful = false;
    },
    handleSubmit(event) {
      event.preventDefault();
      this.message = '';
      this.loading = true;
      if (this.validate(this.user.username, this.user.password) === true) {
        this.$store.dispatch('auth/register', this.user)
        .then(
          data => {
            this.loading = false;
            this.successful = true;
            this.message = data.message;
          },
          error => {
            this.loading = false;
            let errorMsg =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            this.validationFailed(errorMsg);
          }
        );
      }
    }
  }
};
</script>