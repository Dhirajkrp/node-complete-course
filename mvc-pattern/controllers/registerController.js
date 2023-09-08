const userDB = {
  users: require("../model/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res
      .status(400)
      .json({ message: "Username and password is required" });
  }

  // check for duplicate data in the json

  const duplicate = userDB.users.find((person) => person.username === user);

  if (duplicate) {
    return res.sendStatus(409);
  } else {
    try {
      //encrypt the password
      const hashedPassword = await bcrypt.hash(password, 10);

      //create a new user
      const newUser = {
        username: user,
        password: hashedPassword,
      };

      //ading the new user
      userDB.setUsers([...userDB.users, newUser]);

      await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "user.json"),
        JSON.stringify(userDB.users)
      );

      console.log(userDB.users);
      res.status(201).json({ messae: `New User ${user} created ` });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
};

module.exports = { handleNewUser };
