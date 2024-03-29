const express = require("express");
const router = express.Router();
const controller = require("./../controler/childController");
const {
  insertChildValidator,
  updateChildValidator
} = require("./../MadelWare/Validations/childValidator");
const validatonResult = require("./../MadelWare/Validations/validationResult");

router
  .route("/child")
  .get(controller.getAllChild)
  .post(insertChildValidator,validatonResult,controller.insertChild);
  
  router.route("/child/:_id")
  .get(controller.getChildtById)
  .patch(updateChildValidator,controller.updateChild)
  .delete(controller.deleteChild);
  
  module.exports = router;
