<template>
	<div class="navbar">
	  <div class="navbarHeader">Feeds</div>
	  <div class="navbarContent" v-if="feedList.length > 0">
	  	<NavbarItem :feed="feed" v-for="feed in mapFeedList(feedList)" :key="feed.id"></NavbarItem>
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
		props: [
			"feedList",
			"feed"
		],
		mounted() {
			console.log(this.$props.feedList);
		},
		methods: {
			mapFeedList(feedList) {
	      return feedList.map(feed => ({...feed, id: feed.id, isActive: this.isFeedActive(feed)}))
	    },
	    isFeedActive(feed) {
	      return !!feed && feed.id !== undefined && feed.id === this.activeFeedId
	    }
		}
	}
</script>