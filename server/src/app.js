const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const connectionDetails = require('./private/dbConfig.js')
const connection = mysql.createPool(connectionDetails)
const app = express()

function showError(err) {
  console.log('--------------- Error while performing Query.');
  console.log(err);
}

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

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

app.post("/beereader-vue/checkAuth", function(req, res) {
  const username = connection.escape(req.body.username);
  const password = connection.escape(req.body.password);
  const sql = 'SELECT id, username, role from users WHERE username = ' + username + ' AND password = ' + password;
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

app.get("/beereader-vue/adminGetUsers/", function(req, res) {
  const sql = 'SELECT id, username, role FROM users ORDER BY username;';
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

app.post("/beereader-vue/adminGetUser/", function(req, res) {
  const id = connection.escape(req.body.id);
  const sql = 'SELECT * FROM users WHERE id = ' + id;
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

app.post("/beereader-vue/adminEditUser", function(req, res) {
  const username = connection.escape(req.body.username);
  const password = connection.escape(req.body.password);
  const role = connection.escape(req.body.role);
  const id = connection.escape(req.body.id);
  const sql = 'UPDATE users SET username = ' + username + ', password = ' + password + ', role = ' + role + ' WHERE (id = ' + id + ')';
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

app.post("/beereader-vue/adminDeleteUser", function(req, res) {
  const username = connection.escape(req.body.username);
  const id = connection.escape(req.body.id);
  const sql = 'DELETE FROM users WHERE (id = ' + id + ');';
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

app.post("/beereader-vue/adminAddUser", function(req, res) {
  const username = connection.escape(req.body.username);
  const password = connection.escape(req.body.password);
  const role = connection.escape(req.body.role);
  const sql = 'INSERT INTO users (username, password, role) VALUES (' + username + ', ' + password + ', ' + role + ');';
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

app.get('/posts', (req, res) => {
  res.send(
    [{
      title: "Hello World!",
      description: "Hi there! How are you?"
    }]
  )
})

app.listen(process.env.PORT || 8081)