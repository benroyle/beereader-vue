<template>
	<div class="contentRow">
		<Navbar v-bind:feedList='feedList'/>
		<Content v-bind:feed='feed'/>
	</div>
</template>

<script>
	//import { adminService } from './../services/admin.service.js'
	import { authenticationService } from './../services/auth.service.js'
	import { feedService } from './../services/feed.service.js'
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