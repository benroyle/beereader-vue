const { authJwt } = require("../middleware");
const { feeds } = require("../middleware");
const controller = require("../controllers/feed.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/beereader-vue/getFeedsForUser", controller.getFeedsForUser);

  app.post("/beereader-vue/getFeedItems", controller.getFeedItems);

  app.post("/beereader-vue/editFeed", controller.editFeed);
  
  app.post("/beereader-vue/deleteFeed", controller.deleteFeed);
  
  app.post("/beereader-vue/deleteAllFeeds", controller.deleteAllFeeds);
  
  app.post("/beereader-vue/addFeed", controller.addFeed);
};
