const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;

require("dotenv").config();
const path = require("path");

const userDB = {
  users: require("../model/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({ message: "Username and password required" });
  }
  const foundUser = userDB.users.find((person) => person.username === user);

  if (!foundUser) {
    return res.sendStatus(401); // unauthorized
  }
  // evealuate the password

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    // create some JWT tokens such as a normal token and a refresh token.
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    //saving the current user with the with the refresh token.
    userDB.users.forEach((person) => {
      if (person.username === foundUser.username) {
        person["refreshToken"] = refreshToken;
      }
    });
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      accessToken,
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
