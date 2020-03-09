<template>
	<div class="contentDiv">
		<div class="contentItem" v-if="currentFeedItems.length > 0">
			<ContentItem v-bind:item="item" v-for="item in mapFeedItems(currentFeedItems)" v-bind:key="item.id"></ContentItem>
		</div>
		<div class="contentItem" v-if="currentFeedItems.length === 0">
			<p>Loading...</p>
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
			}
		},
		methods: {
			mapFeedItems(items) {
				if (items.length > 0) {
					return items.map((item, index) => ({...item, id: index}));
				}
			},
			displayCurrentFeedItems() {
				return this.$store.state.feeds.currentFeedItems;
			}
		}
	}
</script>