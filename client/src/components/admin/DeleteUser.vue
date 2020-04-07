<template>
  <div class="deleteFeed">
    <div v-if="!successful">
      <h2>Delete Feed</h2>
      <form v-on:submit="handleSubmit">
        <div class="left">
          Site name:
        </div>
        <div class="right">
          {{ sitename }}
        </div>
        <div class="left">
          Feed URL:
        </div>
        <div class="right">
          {{ siteurl }}
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right">
          <button type="submit" class="submitButton" :disabled="loading">Delete this feed</button>
          <button type="reset" class="cancelButton" v-on:click="goBack">Cancel</button>
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right errorMsg">
          {{ message }}
        </div>
      </form>
    </div>
    <div v-if="successful">
      <h2>Feed deleted</h2>
      <p>{{ message }}</p>
      <p>Please <router-link to="/app">click here</router-link> to return to the app.</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DeleteFeed',
    data() {
      return {
        sitename: '',
        siteurl: '',
        feedid: '', 
        loading: false,
        successful: false,
        message: ''
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      currentFeeds() {
        return this.$store.state.feeds.currentFeeds;
      }
    },
    methods: {
      processErrorMsg(text) {
        if (text.message) {
          this.message = text.message;
        } else {
          this.message = text;
        }
        this.successful = false;
      },
      handleSubmit(event) {
        event.preventDefault();
        this.message = '';
        this.loading = true;
        let feed = {
          id: this.feedid,
          sitename: this.sitename,
          siteurl: this.siteurl,
          userid: this.$store.state.auth.user.id.toString()
        };
        this.$store.dispatch('feeds/deleteFeed', feed)
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
        this.$router.push("/profile");
      }
    },
    mounted() {
      if (!this.loggedIn) {
        this.$router.push('/');
      } else {
        if (this.$route.params.id) {
          let feeds = this.$store.state.feeds.currentFeeds;
          for (let i = 0; i < feeds.length; i++) {
            if (feeds[i].id.toString() === this.$route.params.id) {
              this.sitename = feeds[i].sitename;
              this.siteurl = feeds[i].siteurl;
              this.feedid = this.$route.params.id;
            }
          }
        }
      }
    }
  };
</script>