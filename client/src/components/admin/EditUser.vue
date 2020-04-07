<template>
  <div class="editUser">
    <div v-if="!successful">
      <h2>Edit User</h2>
      <form v-on:submit="handleSubmit">
        <div class="left">
          Site name:
        </div>
        <div class="right">
          <input type="text" name="sitename" id="sitename" placeholder="site name" v-model="sitename" />
        </div>
        <div class="left">
          User URL:
        </div>
        <div class="right">
          <input type="text" name="siteurl" id="siteurl" placeholder="feed url" v-model="siteurl" />
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right">
          <button type="submit" class="submitButton" :disabled="loading">Save changes</button>
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
      <h2>User edited</h2>
      <p>{{ message }}</p>
      <p>Please <router-link to="/app">click here</router-link> to return to the app.</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EditUser',
    data() {
      return {
        sitename: '',
        siteurl: '',
        feedid: '', 
        loading: false,
        successful: false,
        message: ''
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      },
      currentUsers() {
        return this.$store.state.feeds.currentUsers;
      }
    },
    methods: {
      validate(sitename, siteurl) {
        let errorMsg = '';
        if ((sitename === undefined) || (sitename === '')) {
          errorMsg += "Site Name field is empty. ";
        }
        if ((siteurl === undefined) || (siteurl === '')) {
          errorMsg += "Site URL field is empty. ";
        }
        if (errorMsg !== '') {
          errorMsg += "Please complete the form and try again.";
          this.processErrorMsg(errorMsg);
          return false;
        } else {
          return true;
        }
      },
      processErrorMsg(text) {
        if (text.message) {
          this.message = text.message;
        } else {
          this.message = text;
        }
        this.successful = false;
      },
      handleSubmit(event) {
        event.preventDefault();
        this.message = '';
        this.loading = true;
        if (this.validate(this.sitename, this.siteurl) === true) {
          let feed = {
            id: this.feedid,
            sitename: this.sitename,
            siteurl: this.siteurl,
            userid: this.$store.state.auth.user.id.toString()
          };
          this.$store.dispatch('feeds/editUser', feed)
          .then(
            data => {
              this.loading = false;
              this.successful = true;
              this.message = data.message;
            },
            error => {
              console.log(error);
              this.loading = false;
              let errorMsg =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.processErrorMsg(errorMsg);
            }
          );
        }
      },
      goBack() {
        this.$router.push("/profile");
      }
    },
    mounted() {
      if (!this.loggedIn) {
        this.$router.push('/');
      } else {
        if (this.$route.params.id) {
          let feeds = this.$store.state.feeds.currentUsers;
          for (let i = 0; i < feeds.length; i++) {
            if (feeds[i].id.toString() === this.$route.params.id) {
              this.sitename = feeds[i].sitename;
              this.siteurl = feeds[i].siteurl;
              this.feedid = this.$route.params.id;
            }
          }
        }
      }
    }
  };
</script>