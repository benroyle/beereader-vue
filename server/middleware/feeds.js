const db = require("../models");
const FEEDS = db.FEEDS;
const Feed = db.feed;

getFeedsForUser = (req, res, next) => {
  // Username
  Feed.findAll({
    where: {
      userId: req.body.userId
    }
  })
  .then(feed => {
    req.feed += feed;
  });
  next();
};

const feeds = {
  getFeedsForUser: getFeedsForUser
};

module.exports = feeds;