const teacherSchema=require("./../Model/TeacherModel")
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
    teacherSchema.findOne({
    fullName: req.body.fullName,
    password: req.body.password,
  })
    .then((teacher) => {
      if (!teacher) {
        throw new Error("Not Authenticated");
      }

      const token = jwt.sign(
        {
          _id:teacher._id,
          role: "admin",
        },
        "iti_System",
        { expiresIn: "1hr" }
      );
      res.json({ teacher, token });
    })
    .catch((error) => next(error));
};
