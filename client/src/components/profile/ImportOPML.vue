<template>
  <div class="importOPML">
    <div v-if="!successful">
      <h2>Import OPML</h2>
      <form v-on:submit="handleSubmit">
        <div class="left">
          OPML File:
        </div>
        <div class="right">
          <input type="file" name="file" id="file" class="fileBrowser" multiple="false" v-on:change="onFileChange" />
        </div>
        <div class="right">
          <button type="submit" class="submitButton" :disabled="loading">Import feeds</button>
          <button type="reset" class="cancelButton" v-on:click="goBack">Cancel</button>
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right errorMsg">
          {{ message }}
        </div>
      </form>
    </div>
    <div v-if="successful">
      <h2>Feeds added</h2>
      <div v-for="(message, index) in messages" v-bind:key="index"><p v-html="message"></p></div>
      <p>Please <router-link to="/app">click here</router-link> to return to the app.</p>
    </div>
  </div>
</template>

<script>
  import Feed from '../../models/Feed'

  export default {
    name: 'ImportOPML',
    data() {
      return {
        fileinput: '',
        fileCount: 0,
        feeds: [],
        loading: false,
        successful: false,
        messages: [],
        message: ''
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      currentFeeds() {
        return this.$store.state.feeds.currentFeeds;
      }
    },
    methods: {
      async handleSubmit(event) {
        event.preventDefault();
        this.message = '';
        this.loading = true;
        if (this.$data.fileinput !== '') {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(this.$data.fileinput,"text/xml");
          const nodes = xmlDoc.getElementsByTagName("outline");
          this.rssProcessor(nodes);
          let addAllFeeds = await Promise.all(this.$data.feeds.map(async (feed,index) => {
            await this.$store.dispatch('feeds/addFeed', feed)
            .then(
              data => {
                this.messages.push(data.message);
              },
              error => {
                this.loading = false;
                let errorMsg =
                  (error.response && error.response.data && error.response.data.message) ||
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
                this.messages.push(errorMsg);
              }
            )
          }));
          this.loading = false;
          this.successful = true;
          this.$data.fileinput = '';
        } else {
          this.message = "File is already being processed, please wait.";
        }
      },
      rssProcessor(node) {
        if (node.length !== undefined) {
          for (let i = 0; i < node.length; i++) {
            this.rssFinder(node[i]);
          }
        } else {
          this.rssFinder(node);
        }
      },
      rssFinder(node) {
        if (node.getAttribute("type") === "rss") {
          let newFeedObj = new Feed (node.getAttribute("title"), node.getAttribute("xmlUrl"), this.$store.state.auth.user.id);
          this.$data.feeds.push(newFeedObj);
        }
      },
      onFileChange(event) {
        var files = event.target.files || event.dataTransfer.files;
        if (!files.length) return;
        this.createInput(files[0]);
      },
      createInput(file) {
        let promise = new Promise((resolve, reject) => {
          var reader = new FileReader();
          var vm = this;
          reader.onload = event => {
            resolve((vm.fileinput = reader.result));
          };
          reader.readAsText(file);
        });
        promise.then(
          result => {
            /* handle a successful result */
            //console.log(this.fileinput);
          },
          error => {
            /* handle an error */ 
            console.log(error);
          }
        );
      },
      goBack() {
        this.$router.push("/profile");
      }
    },
    mounted() {
      if (!this.loggedIn) {
        this.$router.push('/');
      }
    }
  };
</script>