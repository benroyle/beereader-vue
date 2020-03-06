<template>
	<div class="item closed">
		<div class="title" v-on:click="openItem" v-html="this.$props.item.title">
		</div>
		<div class="date" v-if="this.$props.item.date" v-html="this.$props.item.date">
		</div>
		<div class="content" v-html="this.$props.item.content">
		</div>
		<div class="link" v-if="this.$props.item.link">
			Read more: <a :href="this.$props.item.link" target="_blank" rel="noopener noreferrer">props.item.link</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ContentItem',
		props: ['item'],
		computed: {
			isActive() {
				if (this.$props.item.id === this.$store.state.feeds.currentFeed.id) {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
			setCurrentFeed() {
				this.$store.dispatch('feeds/setCurrentFeed', this.$props.item.id)
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