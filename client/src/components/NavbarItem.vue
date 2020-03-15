<template>
	<div class="buttonDiv">
		<button class="feed" v-bind:class="{active: isActive}" v-on:click="setActiveFeed">{{feed.sitename}}</button>
	</div>
</template>

<script>
	export default {
		name: 'NavbarItem',
		props: ['feed'],
		computed: {
			isActive() {
				if (this.$props.feed.id === this.$store.state.feeds.activeFeed.id) {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
			setActiveFeed() {
				this.$store.dispatch('feeds/setActiveFeed', this.$props.feed.id)
        .then(
          response => {
          	//console.log("current feedid is " + response);
          },
          error => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            console.log(this.message);
          }
        );
			}
		}
	}
</script>