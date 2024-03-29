const express = require("express");
const router = express.Router();
const controller = require("./../controler/classController");
const {
  insertChildValidator,updateChildValidator
} = require("./../MadelWare/Validations/classValidator");
const validatonResult = require("./../MadelWare/Validations/validationResult");

router
  .route("/class")
  .get(controller.getAllClasses)
  .post(insertChildValidator,validatonResult,controller.addNewClass);
  
  router.route("/class/:id")
  .get(controller.getClassById)
  .patch(updateChildValidator,controller.updateClass)
  .delete(controller.deleteClass);
  
  router.route("/class/child/:id")
  .get(controller.getChildInfo);

router.route("/class/teachers/:id")
  .get(controller.getSupervisorInfo);
  module.exports = router;