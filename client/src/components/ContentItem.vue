<template>
	<div class="item closed">
		<div class="title" v-on:click="openItem">
			{{item.title}}
		</div>
		<div class="date" v-if="item.date">
			{{item.date}}
		</div>
		<div class="content">
			{{item.content}}
		</div>
		<div class="link" v-if="item.link">
			Read more: <a :href="item.link" target="_blank" rel="noopener noreferrer">item.link</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ContentItem',
		props: ['item'],
		computed: {
			isActive() {
				if (this.$props.item.id === this.$store.state.feeds.activeFeed.id) {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
			setActiveFeed() {
				this.$store.dispatch('feeds/setActiveFeed', this.$props.item.id)
        .then(
          response => {
          	console.log("current feedid is " + response);
          },
          error => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            console.log(this.message);
          }
        );
			},
			openItem() {
				console.log(this);
			}
		}
	}
</script>