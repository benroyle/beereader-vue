<template>
  <div class="contentRow">
    <div class="modalDiv">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Profile',
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    mounted() {
      if (!this.loggedIn) {
        this.$router.push('/');
      }
    }
  };
</script>