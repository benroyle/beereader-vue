<template>
	<div class="contentRow">
		<Navbar v-bind:currentFeeds='currentFeeds'/>
		<Content v-bind:currentFeedItems='currentFeedItems'/>
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
      currentFeeds() {
        return this.$store.state.feeds.currentFeeds;
      },
      currentFeedItems() {
        if (this.$store.state.feeds.currentFeed) {
          this.getFeedItems(this.$store.state.feeds.currentFeed.siteurl);
        }
        return this.$store.state.feeds.currentFeedItems;
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
          () => {
            console.log("gotFeedItems");
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