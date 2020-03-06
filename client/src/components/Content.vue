<template>
	<div class="contentDiv">
		<p>{{ displayCurrentFeed() }}</p>
		<p>{{ displayCurrentFeedItems() }}</p>
		<ContentItem v-bind:item="item" v-for="item in mapFeedItems(currentFeedItems)" v-bind:key="item.id"></ContentItem>
	</div>
</template>

<script>
	import ContentItem from './ContentItem.vue'

	export default {
		name: 'Content',
		components: {
			ContentItem
		},
		computed: {
			currentFeedItems() {
				return this.$store.state.feeds.currentFeedItems;
			}
		},
		methods: {
			mapFeedItems(items) {
				console.log(items);
				if (items.length > 0) {
					return items.map((item, index) => ({...item, id: index}));
				}
			},
			displayCurrentFeed() {
				return this.$store.state.feeds.currentFeed;
			},
			displayCurrentFeedItems() {
				return this.$store.state.feeds.currentFeedItems;
			}
		},
		/*asyncComputed: {
			mapFeedItems(feed) {
				if (feed.id) {
					this.$store.dispatch('feeds/getFeedItems', this.$props.currentFeed)
	        .then(
	          (response) => {
	          	let resArray = response.map((item, index) => ({...item, id: index}));
	          	return resArray;
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
		}*/
	}
</script>