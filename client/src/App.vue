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
      <div class="greeting">
        <div v-if="isLoggedIn">Hello&nbsp;<strong>{{currentUser.username}}</strong>!</div>
      </div>
      <nav>
        <div class="links" v-if="!isLoggedIn">
          <a href="/">Login</a>
          <a href="/register">Register</a>
        </div>
        <div class="links" v-if="isLoggedIn">
          <a href="/" v-if="isLoggedIn">Home</a>
          <a href="/admin" v-if="isAdmin">Admin</a>
          <a href="/user" v-if="isLoggedIn">My Details</a>
          <a href="/logout" v-if="isLoggedIn">Logout</a>
        </div>
      </nav>
    </div>
    <router-view v-bind:feedList='feedList' v-bind:feed='feed'></router-view>
  </div>
</template>

<script>
  //import { adminService } from './services/admin.service.js'
  //import { feedService } from './services/feed.service.js'

  export default {
    name: 'App',
    data() {
      return {
        feedList: {
          type: Array
        },
        feed: {
          type: String
        }
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
      isLoggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      isAdmin() {
        if (this.currentUser && this.currentUser.roles) {
          return this.currentUser.roles.includes('ROLE_ADMIN');
        }
        return false;
      },

    }
  }
</script>

<style src="./assets/stylesheet.css"></style>