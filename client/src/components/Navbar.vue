<template>
	<div class="navbar" v-if="currentFeeds && currentFeeds.length > 0">
	  <div class="navbarHeader">Feeds</div>
	  <div class="navbarContent">
	  	<NavbarItem v-bind:feed="feed" v-for="feed in mapFeedList(currentFeeds)" v-bind:key="feed.id"></NavbarItem>
	  </div>
	</div>
</template>

<script>
	import NavbarItem from './NavbarItem.vue'

	export default {
		name: 'Navbar',
		components: {
			NavbarItem
		},
		computed: {
			currentFeeds() {
				return this.$store.state.feeds.currentFeeds;
			}
		},
		methods: {
			mapFeedList(feeds) {
	      return feeds.map(feed => ({...feed}))
	    }
		}
	}
</script>