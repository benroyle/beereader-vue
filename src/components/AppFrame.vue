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
		props: ['feedList', 'feed']
	}
</script>