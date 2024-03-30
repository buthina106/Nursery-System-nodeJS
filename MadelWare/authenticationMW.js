const jwt = require("jsonwebtoken");
const admin = {
    id: "id",
    name: "Admin name",
    role: "admin"
};
const secretKey = process.env.SECRET_KEY;
  module.exports = (req, res, next) => {
    try {
      let token = req.get("authorization").split(" ")[1];
      let decoded_token = jwt.verify(token,secretKey);
      req.token = decoded_token;
      next();
    } catch (error) {
      error.message = "not Authenticated";
      next(error);
    }
  };
  module.exports.isAuthorized = (req, res, next) => {
    if (req.token.role === "admin") {
      next();
    } else if (req.token.role === "teachers") {
      if (req.params._id === req.token._id) {
        next();
      } else {
        next(new Error("not Authorized"));
      }
    } else {
      next(new Error("Invalid role"));
    }
  };
