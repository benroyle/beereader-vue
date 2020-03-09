const db = require("../models");
const axios = require('axios');
const x2js = require('x2js');
const Feed = db.feed;

const Op = db.Sequelize.Op;

exports.getFeedsForUser = (req, res) => {
  const userid = req.body.userid;
  Feed.findAll({
    attributes: ['id', 'sitename', 'siteurl'],
    where: {
      userid: {
        [Op.eq]: userid
      }
    },
    order: [["sitename", "ASC"]]
  })
  .then(feeds => {
    res.send(feeds);
  })
  .catch(error => {
    console.log(error);
  });
};

exports.getFeedItems = (req, res) => {
  const feedurl = req.body.feedurl;
  axios.get(feedurl)
  .then(items => {
    const newX2js = new x2js();
    items = newX2js.xml2js(items.data);
    return items;
  })
  .then(items => {
    res.send(items);
  })
  .catch(error => {
    console.log(error);
  });
};

exports.editFeed = (req, res) => {
  const sitename = connection.escape(req.body.sitename);
  const siteurl = connection.escape(req.body.siteurl);
  const id = connection.escape(req.body.id);
  const sql = 'UPDATE feeds SET sitename = ' + sitename + ', siteurl = ' + siteurl + ' WHERE (id = ' + id + ')';
  connection.getConnection(function (err, connection) {
    connection.query(sql, function(err, rows, fields) {
      if (!err) {
        rows = res.json(rows);
        if (rows.length > 0) {
          res.send(rows);
        }
      }
      else {
        showError(err);
      }
      connection.release();
    });
  });
};

exports.deleteFeed = (req, res) => {
  const id = connection.escape(req.body.id);
  const sql = 'DELETE FROM feeds WHERE (id = ' + id + ');';
  connection.getConnection(function (err, connection) {
    connection.query(sql, function(err, rows, fields) {
      if (!err) {
        rows = res.json(rows);
        if (rows.length > 0) {
          res.send(rows);
        }
      }
      else {
        showError(err);
      }
      connection.release();
    });
  });
};

exports.deleteAllFeeds = (req, res) => {
  const userid = connection.escape(req.body.userid);
  const sql = 'DELETE FROM feeds WHERE (userid = ' + userid + ');';
  connection.getConnection(function (err, connection) {
    connection.query(sql, function(err, rows, fields) {
      if (!err) {
        rows = res.json(rows);
        if (rows.length > 0) {
          res.send(rows);
        }
      }
      else {
        showError(err);
      }
      connection.release();
    });
  });
};

exports.addFeed = (req, res) => {
  const sitename = connection.escape(req.body.sitename);
  const siteurl = connection.escape(req.body.siteurl);
  const userid = connection.escape(req.body.userid);
  const sql = 'INSERT INTO feeds (sitename, siteurl, userid) VALUES (' + sitename + ', ' + siteurl + ', ' + userid + ');';
  connection.getConnection(function (err, connection) {
    connection.query(sql, function(err, rows, fields) {
      if (!err) {
        rows = res.json(rows);
        if (rows.length > 0) {
          res.send(rows);
        }
      }
      else {
        showError(err);
      }
      connection.release();
    });
  });
};
