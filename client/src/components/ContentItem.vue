<template>
	<div class="item">
		<div class="title" v-on:click="setActiveFeedItem">
			{{this.getTitle(item.title)}}
		</div>
		<div class="thumbnail" v-if="item.thumbnail"><img :src="this.getThumbnail(item)" border="0"/></div>
		<div class="content" v-html="this.getContent(item)"></div>
		<div class="link" v-if="item.link">
			Link to full article: <a :href="this.getLink(item.link)" target="_blank" rel="noopener noreferrer">{{this.getLink(item.link)}}</a>
		</div>
		<div class="date" v-if="item.pubDate">
			Posted: {{item.pubDate}}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ContentItem',
		props: ['item'],
		methods: {
			setActiveFeedItem() {
				let passData;
				if (this.$props.item.id === this.$store.state.feeds.activeFeedItem.id) {
					passData = false;
				} else {
					passData = this.$props.item.id;
				}
				this.$store.dispatch('feeds/setActiveFeedItem', passData)
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
			},
			getTitle(title) {
				if (title.__text) {
					title = title.__text;
				}
				return title;
			},
			getContent(item) {
				if ((item.encoded) && (item.encoded.__cdata)) {
					return item.encoded.__cdata
				}
				if (item.content) {
					return item.content.__text;
				}
				if (item.summary) {
					return item.summary.__text;
				}
				if (item.description) {
					return item.description;
				}
			},
			getThumbnail(item) {
				if (item.thumbnail._url) {
					return item.thumbnail._url;
				}
			},
			getLink(link) {
				let newLink = '';
				if (Array.isArray(link)) {
					for (let i = 0; i < link.length; i++) {
						if (link[i]._rel === "alternate") {
							newLink = link[i]._href;
						}
					}
				} else {
					newLink = link;
				}
				return newLink;
			}
		}
	}
</script>