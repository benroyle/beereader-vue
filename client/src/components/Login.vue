<template>
  <div class="contentRow">
    <div class="modalDiv">
      <h1>Login</h1>
      <form v-on:submit="handleSubmit">
        <div class="left">
          <label for="username">Username:</label>
        </div>
        <div class="right">
          <input type="text" name="username" placeholder="username" v-model="user.username" />
        </div>
        <div class="left">
          <label for="password">Password:</label>
        </div>
        <div class="right">
          <input type="password" name="password" placeholder="password" v-model="user.password" />
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right">
          <button type="submit" :disabled="loading">Log in</button>
          <span v-show="loading" class="errorMsg">LOADING!!!!!</span>
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
  import User from '../models/user';

  export default {
    name: 'Login',
    data() {
      return {
        user: new User('', ''),
        loading: false,
        errorMsg: ''
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
      handleSubmit: async function(event) {
        event.preventDefault();
        this.loading = true;
        if ((this.username !== '') && (this.password !== '')) {
          await this.axios.get('http://localhost:8081/beereader-vue/checkAuth', {'username': this.username, 'password': this.password})
          .then((response) => {
            if ((response.data.length !== 0) && (response !== false)) {
              this.loading = false;
              this.$emit("authenticated", true);
              this.$router.replace(this.$route.query.redirect || '/app');
            } else {
              this.loading = false;
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
    }
  }
</script>