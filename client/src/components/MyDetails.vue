<template>
  <div class="contentRow">
    <div class="modalDiv">
      <h1>{{currentUser.username}} Profile</h1>
      <p><strong>Token:</strong> {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}</p>
      <p><strong>Id:</strong> {{currentUser.id}}</p>
      <p><strong>Authorities:</strong></p>
      <ul>
        <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>