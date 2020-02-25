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
      <div class="greeting" v-if="currentUser !== null">Hello&nbsp;<div class="username">{{currentUser.username}}</div>!</div>
      <nav>
        <div class="links">
          <a href="/">Home</a>
          <a href="/admin" v-if="isAdmin === true">Admin</a>
          <a href="/user" v-if="currentUser !== undefined">My Details</a>
          <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
        </div>
      </nav>
    </div>
    <router-view v-bind:currentUser='currentUser' v-bind:feedList='feedList' v-bind:feed='feed' @authenticated="setAuthenticated"></router-view>
  </div>
</template>

<script>
  //import { adminService } from './services/admin.service.js'
  import { Observable } from 'rxjs'
  import { authenticationService } from './services/auth.service.js'
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
        setAuthenticated = status;
      },
      logout() {
        this.authenticated = false;
      }
    },
    subscriptions: function () {
      return {
        currentUser: authenticationService.currentUser,
        feedList: feedService.feedList,
        feed: feedService.feed
      }
    },
    data() {
      return {
        currentUser: {
          username: '',
          password: ''
        },
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
    mounted() {
      if (!this.authenticated) {
        this.$router.replace({name: 'Login'});
      } else {
        this.$observables.currentUser.subscribe(currentUser => console.log(currentUser));
        this.$observables.feedList.source.subscribe(feedList => {
          console.log(feedList);
          this.$data.feedList = feedList;
        });
        this.$observables.feed.source.subscribe(feed => {
          console.log(feed);
          this.$data.feed = feed;
        });
        /*feedService.feedList.subscribe(x => 
          this.$data.feedList: x
        );
        feedService.feed.subscribe(x => 
          this.$data.feed: x
        );*/
        console.log(this.$data.feedList);
      }
    },
    updated() {
      if (this.$data.currentUser !== null) {
        feedService.getFeeds(this.$data.currentUser.id);
      }
    }
  }
</script>

<style src="./assets/stylesheet.css"></style>