const express = require("express");

const bcrypt = require("bcrypt");
const app = express();

app.use("/", (req, res) => {
  return res.send("hello world");
});

// tempoarry user array

const users = [];
app.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ message: "username is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "password is required" });
  }

  const encpwd = bcrypt(password, 10);

  const newUser = {
    username,
    password: encpwd,
  };
  users.push(newUser);
  console.log(users);
  return res.status(201).json({ message: "New User Created" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.usernamr === username);

  if (!user) {
    return res.status(401).json({ message: "incorrect username" });
  }
  const isValid = bcrypt(user.password, password);

  if (!isValid) {
    return res.status(401).json({ message: "Incorrect Password" });
  }

  return res.status(200).send("ok");
});

app.listen(8080, () => {
  console.log(`server running on port : localhost:8080 `);
});
