const express = require("express");

const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

// temporary user array

const users = [];
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "username is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "password is required" });
  }
  // checking if the user already exist.

  const duplicateUser = users.find((user) => user.username === username);

  if (duplicateUser) {
    return res.status(409).json({ message: "This username alerady exist" });
  }
  // excrypting the password
  const encpwd = await bcrypt.hash(password, 10);

  const newUser = {
    username,
    password: encpwd,
  };
  users.push(newUser);
  console.log(users);
  return res.status(201).json({ message: "New User Created" });
});

app.get("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(401).json({ message: "incorrect username" });
  }
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(401).json({ message: "Incorrect Password" });
  }

  return res.status(200).send("ok");
});

app.listen(8080, () => {
  console.log(`server running on port : localhost:8080 `);
});
