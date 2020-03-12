<template>
	<div>
		<div class="contentDiv" v-if="currentFeeds && currentFeeds.length > 0">
			<div class="contentItem">
				<ContentItem v-bind:item="item" v-for="item in mapFeedItems(currentFeedItems)" v-bind:key="item.id"></ContentItem>
			</div>
		</div>
		<div class="modalDiv" v-if="currentFeeds && currentFeeds.length === 0">
			<h2>No feeds found</h2>
			<p>Looks like you've got no feeds set up. <router-link to="/user/addFeed">Click here</router-link> to add a feed.</p>
		</div>
		<div class="loaderWrapper" v-if="loading">
			<div class="lds-roller">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
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
			},
			currentFeeds() {
				return this.$store.state.feeds.currentFeeds;
			},
			loading() {
				return this.$store.state.loader.loading;
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