const db = require("../models");
const axios = require('axios');
const x2js = require('x2js');
const Feed = db.feed;

const Op = db.Sequelize.Op;

exports.getFeedsForUser = (req, res) => {
  Feed.findAll({
    attributes: ['id', 'sitename', 'siteurl'],
    where: {
      userid: {
        [Op.eq]: req.body.userid
      }
    },
    order: [["sitename", "ASC"]]
  })
  .then(feeds => {
    res.send(feeds);
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
    return;
  });
};

exports.getFeedItems = (req, res) => {
  axios.get(req.body.feedurl)
  .then(items => {
    const newX2js = new x2js();
    items = newX2js.xml2js(items.data);
    res.send(items);
    return;
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
    return;
  });
};

exports.addFeed = (req, res) => {
  Feed.create({
    sitename: req.body.sitename,
    siteurl: req.body.siteurl,
    userid: req.body.userid
  })
  .then(feeds => {
    let message = {message: feeds.sitename + " was added successfully!"};
    res.send(message);
    return;
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
    return;
  });
};

exports.deleteAllFeeds = (req, res) => {
  Feed.destroy({
    where: {
      userid: {
        [Op.eq]: req.body.userid
      }
    }
  })
  .then(data => {
    let msgObj = {};
    let msgString = '';
    if (data === 1) {
      msgString = data + " feed was deleted successfully.";
    } else {
      msgString = data + " feeds were deleted successfully.";
    }
    res.send({message: msgString});
    return;
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
    return;
  });
};

exports.editFeed = (req, res) => {
  Feed.update({ sitename: req.body.sitename, siteurl: req.body.siteurl }, {
    where: {
      id: {
        [Op.eq]: req.body.id
      },
      userid: {
        [Op.eq]: req.body.userid
      }
    }
  })
  .then(data => {
    //console.log(data);
    let message = {message: "The feed was edited successfully!"};
    res.send(message);
    return;
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
    return;
  });
};

exports.deleteFeed = (req, res) => {
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