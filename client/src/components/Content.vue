<template>
	<div>
		<div class="contentDiv" v-if="currentFeeds && currentFeeds.length > 0 && currentFeedItems && currentFeedItems.length > 0">
			<div class="contentItem">
				<ContentItem v-bind:item="item" v-for="item in mapFeedItems(currentFeedItems)" v-bind:key="item.id"></ContentItem>
			</div>
		</div>
		<div class="contentDiv" v-if="currentFeeds && currentFeeds.length === 0">
			<div class="modalDiv">
				<h2>No feeds found</h2>
				<p>Looks like you've got no feeds set up. <router-link to="/user/addFeed">Click here</router-link> to add a feed.</p>
			</div>
		</div>
		<div class="contentDiv" v-if="currentFeedItems && currentFeedItems.length === 0">
			<div class="modalDiv">
				<h2>No feed items found</h2>
				<p>Looks like the selected feed isn't returning any items. Click on another feed on the left to try another one, or <router-link to="/user/addFeed">click here</router-link> to add a feed.</p>
			</div>
		</div>
		<Loading />
	</div>
</template>

<script>
	import ContentItem from './ContentItem.vue'
	import Loading from './Loading.vue'

	export default {
		name: 'Content',
		components: {
			ContentItem,
			Loading
		},
		computed: {
			currentFeedItems() {
				return this.$store.state.feeds.currentFeedItems;
			},
			currentFeeds() {
				return this.$store.state.feeds.currentFeeds;
			}
		},
		methods: {
			mapFeedItems(items) {
				if (items.length > 0) {
					return items.map((item, index) => ({...item, id: index}));
				}
			}
		}
	}
</script>