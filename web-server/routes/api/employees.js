const express = require("express");
const router = express.Router();
const path = require("path");

const data = {};

data.employees = require("../../data/employees.json");

router
  .route("/")
  .get((req, res) => {
    if (!data || !data.employees) {
      res.status(400);
      res.json({
        message: "No Employees Found",
      });
    } else {
      res.status(200);
      res.json(data.employees);
    }
  })
  .post((req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    if (!firstname || !lastname) {
      res.status(400);
      res.json({
        message: "All Fields Are Required",
      });
    } else {
      res.status(200);
      res.json({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
    }
  })

  .put((req, res) => {
    const id = req.body.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    if (!id) {
      res.status(400);
      res.json({ message: "id Required" });
    } else if (!firstname && !lastname) {
      res.status(400);
      res.json({
        message: "No updates specified",
      });
    } else if (firstname && lastname) {
      res.status(200);
      res.json({
        message: "updated firstname ,lastname",
        firstname: firstname,
        lastname: lastname,
      });
    } else if (!lastname) {
      res.status(200);
      res.json({
        message: "updated firstname ",
        firstname: firstname,
      });
    } else if (!firstname) {
      res.status(200);
      res.json({
        message: "updated lastname ",
        lastname: lastname,
      });
    }
  })
  .delete((req, res) => {
    res.json({
      id: req.body.id,
    });
  });

//using url parameters with the api eg: /employees/12
router.route("/:id").get((req, res) => {
  res.json({
    id: req.params.id,
  });
});

module.exports = router;
