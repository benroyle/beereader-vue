<template>
	<div class="contentRow">
		<Navbar feeds={feeds} />
		<Content feed={feed} />
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
		data() {
			return {
				feeds: '',
				feed: ''
			}
		}
	}
</script>