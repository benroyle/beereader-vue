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
    data() {
      return {
        selected: ''
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      currentUser() {
        return this.$store.state.auth.user;
      },
      currentFeeds() {
        return this.$store.state.feeds.currentFeeds;
      }
    },
    methods: {
      getFeeds(userid) {
        this.$store.dispatch('feeds/getFeeds', userid)
        .then(
          () => {
            //console.log("gotFeeds");
          },
          error => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            console.log(this.message);
          }
        );
      },
      buttonClicked(action) {
        if ((action === "editFeed") || (action === "deleteFeed")) {
          if (this.selected !== "") {
            this.$router.push("/profile/" + action + "/" + this.selected);
          }
        } else {
          this.$router.push("/profile/" + action);
        }
      },
      handleSubmit(event) {
        event.preventDefault();
      }
    },
    mounted() {
      if (this.loggedIn) {
        this.getFeeds(this.$store.state.auth.user.id);
      } else {
        this.$router.push('/');
      }
    }
  };
</script>