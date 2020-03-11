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
          <router-link to="/">Login</router-link>
          <router-link to="/register">Register</router-link>
        </div>
        <div class="links" v-if="isLoggedIn">
          <router-link to="/" v-if="isLoggedIn">Home</router-link>
          <router-link to="/admin" v-if="isAdmin">Admin</router-link>
          <router-link to="/user" v-if="isLoggedIn">My Details</router-link>
          <router-link to="/logout" v-if="isLoggedIn">Logout</router-link>
        </div>
      </nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  //import { adminService } from './services/admin.service.js'

  export default {
    name: 'App',
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
        } else {
          return false;
        }
      }
    }
  }
</script>

<style src="./assets/stylesheet.css"></style>