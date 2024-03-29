const express = require("express");
const router = express.Router();
const controller = require("./../controler/teachersController");
const {
  insertValidator,updateValidator
} = require("./../MadelWare/Validations/teacherValidator");
const validatonResult = require("./../MadelWare/Validations/validationResult");
// const { isAuthorized } = require("./../MadelWare/authenticationMW");

router
  .route("/teachers")
  // .get(isAuthorized,controller.getAllTeacher)
  .get(validatonResult,controller.getAllTeacher)
  .post(insertValidator,validatonResult,controller.insertTeacher);
  
  router.route("/teachers/:_id")
  .get(controller.getTeachertById)
  .patch(updateValidator,controller.updateTeacher)
  .delete(controller.deleteTeacher);

  module.exports = router;
