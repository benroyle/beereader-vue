<template>
	<div class="contentRow">
		<Navbar v-bind:feedList='feedList'/>
		<Content v-bind:feed='feed'/>
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
      feedList() {
        return this.$store.state.feeds.feedList;
      },
      feed() {
      	return this.$store.state.feeds.feedList;
      }
    },
		mounted() {
      if (this.$store.state.auth.status.loggedIn) {
        this.$store.dispatch('feeds/getFeedsForUser', this.$store.state.auth.user.id)
        .then(
          response => {
            this.feedList = response;
            this.feed = response[0];
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