<template>
  <div class="contentRow">
    <div class="modalDiv">
<<<<<<< HEAD
      <router-view></router-view>
=======
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
      <form v-if="currentFeeds.length > 0" v-on:submit="handleSubmit">
        <div class="left">
          Feed:
        </div>
        <div class="right">
          <select name="feedSelecter" id="feedSelecter" v-model="selected">
            <option disabled value="">Please select one</option>
            <option v-for="(feed,index) in currentFeeds" :key="index" :value="feed.id">{{feed.sitename}}</option>
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
>>>>>>> admin
    </div>
  </div>
</template>

<script>
  export default {
<<<<<<< HEAD
    name: 'Profile',
=======
    name: 'MyDetails',
>>>>>>> admin
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
<<<<<<< HEAD
        this.$store.dispatch('feeds/getFeeds', userid)
        .then(
          () => {
            //console.log("gotFeeds");
=======
        this.$store.dispatch('feeds/getFeedsForUser', userid)
        .then(
          () => {
            console.log("gotFeeds");
>>>>>>> admin
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
<<<<<<< HEAD
            this.$router.push("/profile/" + action + "/" + this.selected);
          }
        } else {
          this.$router.push("/profile/" + action);
=======
            this.$router.push("/user/" + action + "/" + this.selected);
          }
        } else {
          this.$router.push("/user/" + action);
>>>>>>> admin
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