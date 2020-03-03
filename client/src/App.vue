<template>
  <div class="app">
    <div class="headerRow">
      <div class="title">
        <div class="titleContainer">
          <div class="titleFont black">B</div>
          <div class="titleFont yellow">e</div>
          <div class="titleFont black">e</div>
          <div class="titleFont yellow">&nbsp;</div>
          <div class="titleFont black">R</div>
          <div class="titleFont yellow">e</div>
          <div class="titleFont black">a</div>
          <div class="titleFont yellow">d</div>
          <div class="titleFont black">e</div>
          <div class="titleFont yellow">r</div>
        </div>
      </div>
      <div class="greeting" v-if="loggedIn">Hello&nbsp;<div class="username">{{currentUser.username}}</div>!</div>
      <nav>
        <div class="links" v-if="!loggedIn">
          <a href="/">Login</a>
          <a href="/register">Register</a>
        </div>
        <div class="links" v-if="loggedIn">
          <a href="/" v-if="loggedIn">Home</a>
          <a href="/admin" v-if="loggedIn && isAdmin === true">Admin</a>
          <a href="/user" v-if="loggedIn">My Details</a>
          <a href="/profile" v-if="loggedIn">Profile</a>
          <a href="/logout" v-if="loggedIn">Logout</a>
        </div>
      </nav>
    </div>
    <router-view @authenticated="setAuthenticated" v-bind:feedList='feedList' v-bind:feed='feed'></router-view>
  </div>
</template>

<script>
  //import { adminService } from './services/admin.service.js'
  import { feedService } from './services/feed.service.js'

  export default {
    name: 'App',
    data() {
      return {
        isAdmin: {
          type: Boolean
        },
        feedList: {
          type: Array
        },
        feed: {
          type: String
        },
        authenticated: false
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
      checkAdmin(user) {
        if ((user) && (user.role === 'Admin')) {
          return true;
        } else {
          return false;
        }
      },
      setAuthenticated(status) {
        this.authenticated = status;
      },
      login() {
        if ((this.$route.path !== "/") || (this.$route.path !== "/login")) {
          this.$router.replace(this.$route.query.redirect || '/');
        }
      },
      register() {
        if (this.$route.path !== "/register") {
          this.$router.replace(this.$route.query.redirect || '/register');
        }
      }
    },
    subscriptions: function () {
      return {
        feedList: feedService.feedList,
        feed: feedService.feed
      }
    }
    /*,
    updated () {
      if ((!localStorage.token) && (this.$route.path !== '/')) {
        this.$router.push('/?redirect=' + this.$route.path);
      }
    }*/
  }
</script>

<style src="./assets/stylesheet.css"></style>