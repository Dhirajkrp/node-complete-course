const express = require("express");
const router = express.Router();
const emplyeesController = require("../../controllers/employeesController");

const data = {};
data.employees = require("../../model/employees.json");

router
  .route("/")
  .get(emplyeesController.getAllEmployees)
  .post(emplyeesController.createNewEmployee)
  .put(emplyeesController.updateEmployee)
  .delete(emplyeesController.deleteEmployee);

//using url parameters with the api eg: /employees/12
router.route("/:id").get(emplyeesController.getEmployee);

module.exports = router;
