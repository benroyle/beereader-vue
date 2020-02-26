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
          await this.$http.post('/beereader-vue/checkAuth', {'username': this.username, 'password': this.password})
          .then((response) => (response.data[0]))
          .then((response) => {
            if (response !== false) {
              this.$emit("authenticated", true);
              this.$router.push({name: 'AppFrame'});
              history.pushState({urlPath: '/app'}, "");
            } else {
              this.errorMsg = "Username and /or password fields are incorrect. Please try again.";
            }
          },
          error => {
            console.error(error);
          });
        } else {
          if ((this.username === '') && (this.password === '')) {
            this.errorMsg = "Username and password fields are empty. Please complete the form and try again.";
          } else {
            if (this.username === '') {
              this.errorMsg = "Username field is empty. Please complete the form and try again.";
            } else {
              this.errorMsg = "Password field is empty. Please complete the form and try again.";
            }
          }
        }
      },
      checkCurrentLogin () {
        if (localStorage.token) {
          this.$router.replace(this.$route.query.redirect || '/app')
        }
      }
    },
    created () {
      this.checkCurrentLogin()
    },
    updated () {
      this.checkCurrentLogin()
    }
  }
</script>