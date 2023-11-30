const userDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs");

const path = require("path");

const handleLogout = async (req, res) => {
  // On client also delete the access token
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204); //no content
  }
  const refreshToken = cookies.jwt;

  //check if the refreshToken is present in the database.
  const foundUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204);
  }

  //delete the refresh token from the database.
  userDB.users.forEach((user) => {
    if (user?.refreshToken === refreshToken) {
      delete user.refreshToken;
    }
  });

  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(userDB.users),
    (err) => {
      if (err) {
        console.log(err.message);
      }
    }
  );

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  return res.sendStatus(204);
};

module.exports = { handleLogout };
