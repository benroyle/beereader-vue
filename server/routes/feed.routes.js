const { authJwt } = require("../middleware");
const { verifyFeeds } = require("../middleware");
const controller = require("../controllers/feed.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/beereaderServer/getFeeds", controller.getFeeds);

  app.post("/beereaderServer/getFeedItems", controller.getFeedItems);

  app.post("/beereaderServer/addFeed",
  [
    verifyFeeds.checkDuplicateFeedName,
    verifyFeeds.checkDuplicateFeedURL
  ],
  controller.addFeed);

  app.post("/beereaderServer/editFeed",
  [
    verifyFeeds.checkDuplicateFeedName
  ],
  controller.editFeed);
  
  app.post("/beereaderServer/deleteFeed", controller.deleteFeed);
  
  app.post("/beereaderServer/deleteAllFeeds", controller.deleteAllFeeds);
};
