<template>
  <div class="contentRow">
    <div class="modalDiv">
      <div class="col-md-12">
        <div class="card card-container">
          <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
          />
          <form name="form" v-on:submit="handleRegister">
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
                <button type="submit" :disabled="submitted">Sign Up</button>
              </div>
            </div>
          </form>
          <div class="left">
            &nbsp;
          </div>
          <div class="right errorMsg">
            {{ message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from '../models/User';

export default {
  name: 'Register',
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
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
    handleRegister(event) {
      event.preventDefault();
      this.message = '';
      this.submitted = true;
      if ((this.username !== '') && (this.password !== '')) {
        this.$store.dispatch('auth/register', this.user).then(
          data => {
            console.log("done");
            this.message = data.message;
            this.successful = true;
          },
          error => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            this.successful = false;
            this.submitted = false;
          }
        );
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
    loginFailed(text) {
      this.message = text;
      this.successful = false;
    }
  }
};
</script>