<template>
  <div className="formContainer">
    <h2>Delete Feed</h2>
    <form onSubmit={this.handleSubmit}>
      <div className="left">
        Site name:
      </div>
      <div className="right">
        {this.state.sitename}
      </div>
      <div className="left">
        Feed URL:
      </div>
      <div className="right">
        {this.state.siteurl}
      </div>
      <div className="left">
        &nbsp;
      </div>
      <div className="right">
        <button type="submit" className="submitButton">Delete this feed</button>
        <button type="reset" className="cancelButton" onClick={this.backButton}>Cancel</button>
      </div>
      <div className="left">
        &nbsp;
      </div>
      <div className="right errorMsg">
        {this.state.errorMsg}
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'DeleteAllFeeds'
  }
</script>