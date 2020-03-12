<template>
  <div class="contentRow">
    <div class="modalDiv" v-if="!successful">
      <h2>Delete All Feeds</h2>
      <form v-on:submit="handleSubmit">
        <div class="left">
            &nbsp;
          </div>
          <div class="right">
            Are you sure you want to delete ALL the feeds in this account?
          </div>
          <div class="left">
            &nbsp;
          </div>
          <div class="right">
          <button type="submit" class="submitButton">Delete all feeds</button>
          <button type="reset" class="cancelButton" v-on:click="goBack()">Cancel</button>
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right errorMsg">
          {{ message }}
        </div>
      </form>
    </div>
    <div class="modalDiv" v-if="successful">
      <h2>Feeds deleted</h2>
      <p>{{ message }}</p>
      <p>Please <router-link to="/app">click here</router-link> to return to the app.</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DeleteAllFeeds',
    data() {
      return {
        loading: false,
        successful: false,
        message: ''
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    methods: {
      handleSubmit(event) {
        event.preventDefault();
        this.message = '';
        this.loading = true;
        this.$store.dispatch('feeds/deleteAllFeeds', this.$store.state.auth.user.id)
        .then(
          data => {
            this.loading = false;
            this.successful = true;
            this.message = data.message;
          },
          error => {
            console.log(error);
            this.loading = false;
            let errorMsg =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            this.processErrorMsg(errorMsg);
          }
        );
      },
      goBack() {
        this.$router.push("/user");
      }
    },
    mounted() {
      if (!this.loggedIn) {
        this.$router.push('/');
      }
    }
  };
</script>