<template>
  <div class="contentRow">
    <div class="modalDiv">
      <h1>Login</h1>
      <form v-on:submit="handleSubmit">
        <div class="left">
          Username:
        </div>
        <div class="right">
          <input type="text" name="usernameField" id="usernameField" placeholder="username" v-model="username" />
        </div>
        <div class="left">
          Password:
        </div>
        <div class="right">
          <input type="password" name="passwordField" id="passwordField" placeholder="password" v-model="password" />
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right">
          <button type="submit">Log in</button>
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right errorMsg">
          {{ errorMsg }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        errorMsg: ''
      }
    },
    methods: {
      handleSubmit: async function(event) {
        event.preventDefault();
        if ((this.username !== '') && (this.password !== '')) {
          await this.axios.get('http://localhost:8081/beereader-vue/checkAuth', {'username': this.username, 'password': this.password})
          .then((response) => {
            if ((response.data.length !== 0) && (response !== false)) {
              this.$emit("authenticated", true);
              this.$router.replace(this.$route.query.redirect || '/app');
            } else {
              this.loginFailed("Username and /or password fields are incorrect. Please try again.");
            }
          })
          .catch(() => this.loginFailed());
        } else {
          if ((this.username === '') && (this.password === '')) {
            this.loginFailed("Username and password fields are empty. Please complete the form and try again.");
          } else {
            if (this.username === '') {
              this.loginFailed("Username field is empty. Please complete the form and try again.");
            } else {
              this.loginFailed("Password field is empty. Please complete the form and try again.");
            }
          }
        }
      },
      loginSuccessful(response) {
        if (!req.data.token) {
          this.loginFailed("Invalid token. Please try again.");
          return;
        }
        if ((response.data.length === 0) || (response === false)) {
          this.loginFailed("Username and /or password fields are incorrect. Please try again.");
          return;
        }
        localStorage.token = req.data.token;
        this.error = false;
        this.$router.replace(this.$route.query.redirect || '/app');
      },
      loginFailed(text) {
        this.errorMsg = text;
        delete localStorage.token;
      },
      checkCurrentLogin() {
        if (localStorage.token) {
          this.$router.replace(this.$route.query.redirect || '/app');
        }
      }
    },
    created () {
      this.checkCurrentLogin();
    },
    updated () {
      this.checkCurrentLogin();
    }
  }
</script>