<template>
  <div class="contentRow appFrame">
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
        let items = [];
        if ((this.$store.state.feeds.activeFeed) && (this.$store.state.feeds.activeFeed.siteurl)) {
          items =  this.getFeedItems(this.$store.state.feeds.activeFeed.siteurl);
        }
        return items;
      }
    },
    methods: {
      getFeeds(userid) {
        this.$store.dispatch('feeds/getFeedsForUser', userid)
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
      getFeedItems(siteurl) {
        this.$store.dispatch('loader/begin');
        this.$store.dispatch('feeds/getFeedItems', siteurl)
        .then(
          response => {
            //console.log("gotFeedItems");
            console.log(response);
            let feedItemsArray = [];
            if (response.rss) {
              if (Array.isArray(response.rss.channel.item)) {
                feedItemsArray = response.rss.channel.item;
              }
            }
            if (response.feed) {
              if (Array.isArray(response.feed.entry)) {
                feedItemsArray = response.feed.entry;
              }
            }
            if (response.html) {
              this.message = "The URL has returned HTML, not a valid feed.";
              console.log(this.message);
              return;
            }
            if (feedItemsArray.length > 10) {
              const excess = (feedItemsArray.length - 10);
              feedItemsArray.splice(10, excess);
            }
            this.$store.dispatch('loader/end');
            return feedItemsArray;
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