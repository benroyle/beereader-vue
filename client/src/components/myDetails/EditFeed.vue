<template>
  <div class="modalDiv">
    <h2>Edit Feed</h2>
    <form v-on:submit="handleSubmit">
      <div class="left">
        Site name:
      </div>
      <div class="right">
        <input type="text" name="sitename" id="sitename" placeholder="site name" v-model="sitename" v-on:change="sitename" />
      </div>
      <div class="left">
        Feed URL:
      </div>
      <div class="right">
        <input type="text" name="siteurl" id="siteurl" placeholder="feed url" v-model="siteurl" v-on:change="siteurl" />
      </div>
      <div class="left">
        &nbsp;
      </div>
      <div class="right">
        <button type="submit" class="submitButton">Save changes</button>
        <button type="reset" class="cancelButton" v-on:click="backButton">Cancel</button>
      </div>
      <div class="left">
        &nbsp;
      </div>
      <div class="right errorMsg">
        {{errorMsg}}
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'EditFeed',
    methods: {
      handleSubmit(event) {
        event.preventDefault();
      },
      backButton() {
        this.$router.push("/user");
      }
    }
  };
</script>