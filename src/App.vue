<template>
  <div class="app">
    <div class="navColumn">
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
      <Navbar feedList={feedList}></Navbar>
    </div>
    <div class="contentColumn">
      <div class="greeting">Hello <strong>{{ username }}</strong>!</div>
      <nav>
        <div class="links">
          <a href="/">Home</a>
          <a href="/admin">Admin</a>
          <a href="/user">My Details</a>
          <a href="/logout">Logout</a>
        </div>
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue'
  //import Content from './components/Content.vue'

  export default {
    name: 'App',
    components: {
      Navbar
    },
    data() {
      return {
        username: 'Bozzley'
      }
    }
  }
</script>

<style src="./assets/stylesheet.css"></style>