const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/beereader-vue/getFeedsForUser", function(req, res) {
    const id = connection.escape(req.body.id);
    const sql = 'SELECT * from feeds WHERE userid = ' + id + ' ORDER BY sitename';
    connection.getConnection(function (err, connection) {
      connection.query(sql, function(err, rows, fields) {
        if (!err) {
          res.send(rows);
        }
        else {
          showError(err);
        }
        connection.release();
      });
    });
  });

  /*app.get(
    "/beereader-vue/checkAuth",
    [authJwt.verifyToken],
    controller.userBoard
  );*/

  app.post("/beereader-vue/editFeed", function(req, res) {
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
  });

  app.post("/beereader-vue/deleteFeed", function(req, res) {
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
  });

  app.post("/beereader-vue/deleteAllFeeds", function(req, res) {
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
  });

  app.post("/beereader-vue/addFeed", function(req, res) {
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
  });

  app.get('/test', (req, res) => {
    res.send(
      [{
        title: "Hello World!",
        description: "Hi there! How are you?"
      }]
    )
  })
};

/*app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );*/