<template>
  <div class="contentRow">
    <div class="modalDiv">
      <h2>Add Feed</h2>
      <form v-on:submit="handleSubmit">
        <div class="left">
          Site name:
        </div>
        <div class="right">
          <input type="text" name="sitename" id="sitename" placeholder="site name" v-model="sitename" />
        </div>
        <div class="left">
          Feed URL:
        </div>
        <div class="right">
          <input type="text" name="siteurl" id="siteurl" placeholder="feed url" v-model="siteurl" />
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right">
          <button type="submit" class="submitButton">Save feed</button>
          <button type="reset" class="cancelButton" v-on:click="goBack">Cancel</button>
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right errorMsg">
          {{errorMsg}}
        </div>
      </form>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'AddFeed',
    data() {
      return {
        sitename: '',
        siteurl: '',
        errorMsg: ''
      }
    },
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
      handleSubmit(event) {
        event.preventDefault();
        console.log(sitename.value);
      },
      addFeed(userid) {
        this.$store.dispatch('feeds/addFeed', sitename, siteurl, currentUser.id)
        .then(
          () => {
            console.log("feedAdded");
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
      goBack() {
        this.$router.push("/user");
      }
    },
    mounted() {
      if (!this.$store.state.auth.status.loggedIn) {
        this.$router.push('/');
      }
    }
  };
</script>