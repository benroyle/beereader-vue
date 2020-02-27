<template>
	<div class="buttonDiv">
		<button class="feed">{{feed.sitename}}</button>
	</div>
</template>

<script>
	export default {
		name: 'NavbarItem',
		props: ['feed'],
		mounted() {
			console.log(this.$props.feed);
		}
	}
</script>