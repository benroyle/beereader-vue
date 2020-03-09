<template>
  <div class="contentRow">
    <div class="modalDiv">
      <h2>{{currentUser.username}} Profile</h2>
      <p><strong>Token:</strong> {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}</p>
      <p><strong>Id:</strong> {{currentUser.id}}</p>
      <p><strong>Authorities:</strong></p>
      <ul>
        <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
      </ul>
      <p><button v-on:click="buttonClicked('addFeed')">Add feed</button></p>
      <p><button v-on:click="buttonClicked('deleteAllFeeds')">Delete all feeds</button></p>
      <p><button v-on:click="buttonClicked('importOPML')">Import OPML</button></p>
      <form v-on:submit.prevent>
        <div class="left">
          Feed:
        </div>
        <div class="right">
          <select name="feedSelecter" id="feedSelecter">
            <option v-for="(feed,index) in currentFeeds" :key="index" :value="index">{{feed.sitename}}</option>
          </select>
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right">
          <button v-on:click="buttonClicked('editFeed')">Edit feed</button>
          <button v-on:click="buttonClicked('deleteFeed')">Delete feed</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'MyDetails',
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      },
      currentFeeds() {
        return this.$store.state.feeds.currentFeeds;
      }
    },
    methods: {
      getFeeds(userid) {
        this.$store.dispatch('feeds/getFeedsForUser', userid)
        .then(
          () => {
            console.log("gotFeeds");
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
        const feedId = document.querySelector("select#feedSelecter").value;
        if ((action === "editFeed") || (action === "deleteFeed")) {
          this.$router.push("/user/" + action + "/" + feedId);
        } else {
          this.$router.push("/user/" + action);
        }
      }
    },
    mounted() {
      if (this.$store.state.auth.status.loggedIn) {
        this.getFeeds(this.$store.state.auth.user.id);
      } else {
        this.$router.push('/');
      }
    }
  };
</script>