<template>
  <div class="contentRow">
    <div class="modalDiv">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Admin',
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
    },
    mounted() {
      if ((!this.isLoggedIn) || (!this.isAdmin)) {
        this.$router.push('/');
      }
    }
  };
</script>