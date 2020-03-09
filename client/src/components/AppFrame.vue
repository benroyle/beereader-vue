<template>
	<div class="contentRow">
		<Navbar/>
		<Content v-bind:currentFeedItems="currentFeedItems"/>
	</div>
</template>

<script>
	import Navbar from './Navbar.vue'
	import Content from './Content.vue'

	export default {
		name: 'AppFrame',
		components: {
			Navbar,
			Content
		},
    computed: {
      currentFeedItems() {
        let items = {};
        if (this.$store.state.feeds.currentFeed.siteurl) {
          items =  this.getFeedItems(this.$store.state.feeds.currentFeed.siteurl);
        }
        return items;
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
      getFeedItems(siteurl) {
        this.$store.dispatch('feeds/getFeedItems', siteurl)
        .then(
          response => {
            console.log(response);
            console.log("gotFeedItems");
            return response;
          },
          error => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            console.log(this.message);
          }
        );
      }
    },
		created() {
      if (this.$store.state.auth.status.loggedIn) {
        this.getFeeds(this.$store.state.auth.user.id);
      } else {
        this.$router.push('/');
      }
    }
	}
</script>