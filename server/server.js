const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require("bcryptjs");
const app = express()


var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

const Role = db.role;
const User = db.user;
const Feed = db.feed;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "admin"
  });

  User.create({
    id: 1,
    username: "benroyle",
    password: bcrypt.hashSync("skunkap3", 8)
  });

  User.create({
    id: 2,
    username: "benroyleadm",
    password: bcrypt.hashSync("skunkap3", 8)
  });

  Feed.create({
    id: 1,
    sitename: "Eurogamer",
    siteurl: "http://www.eurogamer.net/rss/eurogamer_frontpage_feed.rss",
    userid: 1
  });
}

function showError(err) {
  console.log('--------------- Error while performing Query.');
  console.log(err);
}

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
