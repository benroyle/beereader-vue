module.exports = (sequelize, Sequelize) => {
  const Feed = sequelize.define("feeds", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    sitename: {
      type: Sequelize.STRING
    },
    siteurl: {
      type: Sequelize.STRING
    },
    userid: {
      type: Sequelize.INTEGER
    }
  });
  return Feed;
};