<template>
	<div class="contentDiv">
		<div class="contentHeader">
			feed.sitename
		</div>
		this.renderFeed()
		this.renderErrorMsg()
	</div>
</template>

<script>
	export default {
		name: 'Content',
		data() {
      return {
        username: 'Bozzley'
      }
    }
	}
</script>