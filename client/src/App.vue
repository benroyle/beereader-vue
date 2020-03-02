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
      <div class="greeting" v-if="currentUser">Hello&nbsp;<div class="username">{{currentUser.username}}</div>!</div>
      <nav>
        <div class="links">
          <a href="/" v-if="authenticated">Home</a>
          <a href="/admin" v-if="isAdmin === true">Admin</a>
          <a href="/user" v-if="currentUser">My Details</a>
          <router-link v-if="authenticated" to="/logout" v-on:click.native="logout()" replace>Logout</router-link>
          <router-link v-if="!authenticated" to="/login" v-on:click.native="login()" replace>Login</router-link>
          <router-link v-if="!authenticated" to="/register" v-on:click.native="register()" replace>Register</router-link>
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
      logout() {
        this.authenticated = false;
        if (this.$route.path !== "/logout") {
          this.$router.replace(this.$route.query.redirect || '/logout');
        }
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
    },
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
        authenticated: false,
        currentUser: ''
      }
    },
    mounted() {
      if ((this.$route.path !== '/login') && (this.authenticated)) {
        this.$observables.feedList.source.subscribe(feedList => {
          console.log(feedList);
          this.feedList = feedList;
        });
        this.$observables.feed.source.subscribe(feed => {
          console.log(feed);
          this.feed = feed;
        });
        /*feedService.feedList.subscribe(x => 
          this.feedList: x
        );
        feedService.feed.subscribe(x => 
          this.feed: x
        );*/
        console.log(this.feedList);
      }
    }/*,
    updated () {
      if ((!localStorage.token) && (this.$route.path !== '/')) {
        this.$router.push('/?redirect=' + this.$route.path);
      }
    }*/
  }
</script>

<style src="./assets/stylesheet.css"></style>