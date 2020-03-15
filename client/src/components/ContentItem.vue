<template>
	<div class="item" v-bind:class="{ active: isActive }">
		<div class="title" v-on:click="setActiveFeedItem">
			{{item.title}}
		</div>
		<div class="date" v-if="item.pubDate">
			{{item.pubDate}}
		</div>
		<div class="content" v-if="item.description">
			{{item.description}}
		</div>
		<div class="content" v-if="item.content">
			{{item.content}}
		</div>
		<div class="link" v-if="item.link">
			Read more: <a :href="item.link" target="_blank" rel="noopener noreferrer">{{item.link}}</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ContentItem',
		props: ['item'],
		computed: {
			isActive() {
				if (this.$props.item.id === this.$store.state.feeds.activeFeedItem.id) {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
			setActiveFeedItem() {
				console.log(this);
				console.log(this.item);
				this.$store.dispatch('feeds/setActiveFeedItem', this.$props.item.id)
        .then(
          response => {
          	//console.log("current feeditemid is " + response);
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