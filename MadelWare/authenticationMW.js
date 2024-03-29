const jwt = require("jsonwebtoken");
const admin = {
    id: "id",
    name: "Admin name",
    role: "admin"
};
  module.exports = (req, res, next) => {
    try {
      let token = req.get("authorization").split(" ")[1];
      let decoded_token = jwt.verify(token,"iti_System");
      req.token = decoded_token;
      next();
    } catch (error) {
      error.message = "not Authenticated";
      next(error);
    }
  };
  module.exports.isAuthorized = (req, res, next) => {
    if (req.token.role == admin.role || req.token.role == "teachers") {
      next();
    } else {
      next(new Error("not Authorized"));
    }
  };
