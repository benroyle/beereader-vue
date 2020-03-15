<template>
	<div v-if="loading">
		<div class="loaderWrapper">
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
	export default {
		name: 'Loading',
		computed: {
			loading() {
				return this.$store.state.loader.loading;
			}
		}
	}
</script>