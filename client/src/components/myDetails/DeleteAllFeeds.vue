<template>
  <div class="contentRow">
    <div class="modalDiv">
      <h2>Delete Feed</h2>
      <form onSubmit={this.handleSubmit}>
        <div class="left">
          Site name:
        </div>
        <div class="right">
          {this.state.sitename}
        </div>
        <div class="left">
          Feed URL:
        </div>
        <div class="right">
          {this.state.siteurl}
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right">
          <button type="submit" class="submitButton">Delete this feed</button>
          <button type="reset" class="cancelButton" onClick={this.backButton}>Cancel</button>
        </div>
        <div class="left">
          &nbsp;
        </div>
        <div class="right errorMsg">
          {this.state.errorMsg}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DeleteAllFeeds'
  };
</script>