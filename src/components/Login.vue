<template>
  <div className="modalDiv">
    <h1>Login</h1>
    <form v-on:submit="handleSubmit">
      <div className="left">
        Username:
      </div>
      <div className="right">
        <input type="text" name="usernameField" id="usernameField" placeholder="username" v-model="username" />
      </div>
      <div className="left">
        Password:
      </div>
      <div className="right">
        <input type="password" name="passwordField" id="passwordField" placeholder="password" v-model="password" />
      </div>
      <div className="left">
        &nbsp;
      </div>
      <div className="right">
        <button type="submit">Log in</button>
      </div>
      <div className="left">
        &nbsp;
      </div>
      <div className="right errorMsg">
      {{ errorMsg }}
      </div>
    </form>
  </div>
</template>

<script>
  import { authenticationService } from './../services/auth.service.js'
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
        if ((this.$data.username !== '') && (this.$data.password !== '')) {
          await authenticationService.login(this.$data.username, this.$data.password)
          .then((response) => {
            if (response !== false) {
              console.log(this.$route);
              this.$router.push("/app");
              window.history.pushState(
                null,
                routes["/app"],
                "/app"
              )
            } else {
              this.$data.errorMsg = "Username and /or password fields are incorrect. Please try again.";
            }
          },
          error => {
            console.error(error);
          });
        } else {
          if ((this.$data.username === '') && (this.$data.password === '')) {
            this.$data.errorMsg = "Username and password fields are empty. Please complete the form and try again.";
          } else {
            if (this.$data.username === '') {
              this.$data.errorMsg = "Username field is empty. Please complete the form and try again.";
            } else {
              this.$data.errorMsg = "Password field is empty. Please complete the form and try again.";
            }
          }
        }
      }
    }
  }
</script>