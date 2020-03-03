<template>
  <div class="contentRow">
  	<div class="modalDiv">
      <h1>Logout</h1>
      <p>You have been logged out! Please click <router-link to="/">here</router-link> to log back in.</p>
    </div>
  </div>
</template>

<script>
	export default {
    name: 'Logout',
    mounted() {
    	this.logout();
    },
    methods: {
    	logout() {
        this.$store.dispatch('auth/logout');
      }
    }
  }
</script>