<template>
	<div class="buttonDiv">
		<button class="feed" v-bind:class="{active: isActive}">{{feed.sitename}}</button>
	</div>
</template>

<script>
	export default {
		name: 'NavbarItem',
		props: ['feed'],
		computed: {
			isActive() {
				if (this.$props.feed.id === this.$store.state.feeds.currentFeed.id) {
					return true;
				} else {
					return false;
				}
			}
		}
	}
</script>