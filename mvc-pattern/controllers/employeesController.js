const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  if (!data || !data.employees) {
    res.status(400);
    res.json({
      message: "No Employees Found",
    });
  } else {
    res.status(200);
    res.json(data.employees);
  }
};

const createNewEmployee = (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  if (!firstname || !lastname) {
    res.status(400);
    res.json({
      message: "All Fields Are Required",
    });
  } else {
    const newEmployee = {
      id: data.employees.slice(-1).id + 1 || 1,
      firstname,
      lastname,
    };
    data.setEmployees([...data.employees, newEmployee]);
    res.json(data.employees);
  }
};

const updateEmployee = (req, res) => {
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
};

const deleteEmployee = (req, res) => {
  res.json({
    id: req.body.id,
  });
};

const getEmployee = (req, res) => {
  res.json({
    id: req.params.id,
  });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
