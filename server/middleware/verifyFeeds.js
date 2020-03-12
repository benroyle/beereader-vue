const db = require("../models");
const FEEDS = db.FEEDS;
const Feed = db.feed;

checkDuplicateFeed = (req, res, next) => {
  Feed.findOne({
    where: {
      siteurl: req.body.siteurl,
      userid: req.body.userid
    }
  })
  .then(feed => {
    if (feed) {
      res.status(400).send({
        message: "Failed! " + feed.sitename + " already exists for this user!"
      });
      return;
    } else {
      next();
    }
  });
};

const verifyFeeds = {
  checkDuplicateFeed: checkDuplicateFeed
};

module.exports = verifyFeeds;