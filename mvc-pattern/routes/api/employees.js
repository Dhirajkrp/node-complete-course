const express = require("express");
const router = express.Router();
const emplyeesController = require("../../controllers/employeesController");

const verifyJWT = require("../../middleware/verifyJWT");

router
  .route("/")
  .get(verifyJWT, emplyeesController.getAllEmployees)
  .post(emplyeesController.createNewEmployee)
  .put(emplyeesController.updateEmployee)
  .delete(emplyeesController.deleteEmployee);

//using url parameters with the api eg: /employees/12
router.route("/:id").get(emplyeesController.getEmployee);

module.exports = router;
