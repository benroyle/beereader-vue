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
      validationSuccessful(response) {
        if (!req.data.token) {
          this.validationFailed({message:"Invalid token. Please try again."});
          return;
        }
        if ((response.data.length === 0) || (response === false)) {
          this.validationFailed({message:"Username and /or password fields are incorrect. Please try again."});
          return;
        }
        localStorage.token = req.data.token;
        this.error = false;
        this.$router.replace(this.$route.query.redirect || '/app');
      },
      validationFailed(text) {
        this.message = text.message;
        this.successful = false;
        delete localStorage.token;
      },
      handleSubmit(event) {
        event.preventDefault();
        this.message = '';
        this.loading = true;
        if ((this.username !== '') && (this.password !== '')) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.loading = false;
              this.successful = true;
              this.$router.push('/app');
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.validationFailed(this.message);
            }
          );
        } else {
          if ((this.username === '') && (this.password === '')) {
            this.validationFailed({message:"Username and password fields are empty. Please complete the form and try again."});
          } else {
            if (this.username === '') {
              this.validationFailed({message:"Username field is empty. Please complete the form and try again."});
            } else {
              this.validationFailed({message:"Password field is empty. Please complete the form and try again."});
            }
          }
        }
      },
    }
  }
</script>