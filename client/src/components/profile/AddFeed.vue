<template>
  <div class="contentRow">
    <div class="modalDiv" v-if="!successful">
      <h2>Add Feed</h2>
      <p>As of now, this supports RSS and XML feeds. Support for Atom and RDF feeds to be added at a later date.</p>
      <form v-on:submit="handleSubmit">
        <div class="left">
          <label for="sitename">Feed name</label>
        </div>
        <div class="right">
          <input type="text" name="sitename" placeholder="site name" v-model="feed.sitename" />
        </div>
        <div class="left">
          <label for="siteurl">Feed URL</label>
        </div>
        <div class="right">
          <input type="text" name="siteurl" placeholder="feed url" v-model="feed.siteurl" />
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right">
          <button type="submit" class="submitButton" :disabled="loading">Save feed</button>
          <span v-show="loading" class="errorMsg">LOADING!!!!!</span>
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
    <div class="modalDiv" v-if="successful">
      <h2>Feed added</h2>
      <p>{{ message }}</p>
      <p>Please <router-link to="/app">click here</router-link> to return to the app, or <router-link to="/user/importOPML">click here</router-link> to import an OPML file of feeds.</p>
    </div>
  </div>
</template>

<script>
  import Feed from '../../models/Feed'

  export default {
    name: 'AddFeed',
    data() {
      return {
        feed: new Feed('', '', this.$store.state.auth.user.id),
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
      validate(sitename, siteurl) {
        let errorMsg = '';
        if ((sitename === undefined) || (sitename === '')) {
          errorMsg += "Site Name field is empty. ";
        }
        if ((siteurl === undefined) || (siteurl === '')) {
          errorMsg += "Site URL field is empty. ";
        }
        if (errorMsg !== '') {
          errorMsg += "Please complete the form and try again.";
          this.processErrorMsg(errorMsg);
          return false;
        } else {
          return true;
        }
      },
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
        if (this.validate(this.feed.sitename, this.feed.siteurl) === true) {
          this.$store.dispatch('feeds/addFeed', this.feed)
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
        }
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