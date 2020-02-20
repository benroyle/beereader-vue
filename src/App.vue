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
      <div class="greeting">Hello <strong>{{ username }}</strong>!</div>
      <nav>
        <div class="links">
          <a href="/">Home</a>
          <a href="/admin">Admin</a>
          <a href="/user">My Details</a>
          <a href="/logout">Logout</a>
        </div>
      </nav>
    </div>
    <div class="contentRow">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        username: 'Bozzley'
      }
    }
  }
</script>

<style src="./assets/stylesheet.css"></style>