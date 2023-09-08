const bcrypt = require("bcrypt");

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
    res.status(200).json({
      message: `User is logged in`,
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
