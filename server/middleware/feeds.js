const db = require("../models");
const FEEDS = db.FEEDS;
const Feed = db.feed;

checkDuplicateFeed = (req, res, next) => {
  // Username
  Feed.findOne({
    where: {
      sitename: req.body.sitename,
      siteurl: req.body.siteurl,
      userid: req.body.userid
    }
  })
  .then(feed => {
    if (feed) {
      res.status(400).send({
        message: "Failed! Feed already exists for this user!"
      });
      return;
    }
  });
  next();
};

const feeds = {
  checkDuplicateFeed: checkDuplicateFeed
};

module.exports = feeds;