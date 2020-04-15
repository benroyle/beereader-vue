const { authJwt } = require("../middleware");
const { verifyUsers } = require("../middleware");
const adminController = require("../controllers/admin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/beereaderServer/adminGetUsers", adminController.adminGetUsers);

  app.post("/beereaderServer/adminGetUser", adminController.adminGetUser);

  app.post("/beereaderServer/adminEditUser",
  [
    verifyUsers.checkDuplicateUserName
  ],
  adminController.adminEditUser);
  
  app.post("/beereaderServer/adminDeleteUser", adminController.adminDeleteUser);
};
