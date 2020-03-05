<template>
	<div class="contentRow">
		<Navbar v-bind:currentFeeds='currentFeeds'/>
		<Content v-bind:currentFeed='currentFeed'/>
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
      currentFeed() {
      	return this.$store.state.feeds.currentFeed;
      }
    },
		created() {
      if (this.$store.state.auth.status.loggedIn) {
        this.$store.dispatch('feeds/getFeedsForUser', this.$store.state.auth.user.id)
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
      }
    }
	}
</script>