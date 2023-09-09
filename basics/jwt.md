JWT stands for Json Web Tokens.

can be considered to be a form of identification for the users that is issued after the initial authentication takes place.
When a user completes thier login process and they are authenticated , our rest api will issue the client applicatio an access token and a refresh token , the access token is given a short time before it expires , for example 5 to 15 minutes and the refresh token is given a longer period before it expires, possibly several hours , a day or even.

While no security measures are perfect , we do want to consier the risks of

- XXS:cross site scripting and
- crosss site request forgery

The api will send and receive the tokens in form of json data. To avoid risks it is recommendedfor front-end client applications to only store access tokens in the momory so they are automatically lost when the app is closed, they should not be stored in a local storage or in a cookie, essentially if we can store something using js a hacker can retreive it using js.

This api will issue the tokens in an http only cookie , this type of cookies ais not accessible wth javascript.
Refresh token do need to have expiration so that the user has to login again.
Refresh tokens should not have access to grant new refresh tokens as this might cause to indefinite access.

Overall process involves:

- Issuing the access token after the user has been authneticated.
- User applications can then access the protected routes using the access token, until it expires.
- The middleware will verify the access token everytime the use tries to access a protected route.
- When the access token expires , the user need to send the refresh token to the api , to get a new access token.
- The refresh token is also issued during the authorization , and unlike the access token this token is not renewed.
- The api will verify the refresh token and also cross-reference the database in order to confirm the identity of the user.
- storing a reference of the reference token in the database will allow the refresh token to be terminated early if the user decides to log out.

### Dependencies used :

1. dotenv: This is simply used to manage the environment variables.
2. jsonwebtoken: This allows us to use the webtokens.
   3.cookie-parser: This is used to parse the cookie data .

Once this is installed create a .env file to store the environment variables.After that go to the command line and enter the node prompt using the `node` command.Use this to get a random sequence of characters which can be used as the access token and the refresh token.Use it to get two values.

```js
require("crypto").randomBytes(64).toString("hex");
```

after that set in the .env file set the variables as:

- ACCESS_TOKEN_SECRET=RESULT_OF_FIRST_RANDOM_BYTES
- ACCESS_TOKEN_REFRESH=RESULT_OF_SECOND_RANDOM_BYTES

note do not use a double quotes or any spaces for the varaible and the value.

Once we are done with this , we can create the the access tokens for the current user.

```js
// create some JWT tokens such as a normal token and a refresh token.
const accessToken = jwt.sign(
  { username: foundUser.username },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: "5m" }
);

const refreshToken = jwt.sign(
  { username: foundUser.username },
  process.env.REFRESH_TOKEN_SECRET,
  { expiresIn: "1d" }
);
```

for the access token we can give a short time peroiod such as 5 mins and for the refresh token we can give a longer time period as 1 day.

once we created the access tokens we need to save this in the database.

since we are using the json file for now , we can just store the updated user whith the access token.

```js
//saving the current user with the with the refresh token.
userDB.users.forEach((user) => {
  if (user.username === foundUser.username) {
    user["refreshToken"] = refreshToken;
  }
});
//updating the users.json file
await fsPromises.writeFile(
  path.join(_dirname, "..", "model", "user.json"),
  JSON.stringify(userDB.users)
);
```

once we have set the token we now have to send the token back to the user , we can siply use the `res.json()` to send the accesstoken but this will not be safe , thus we use an http only cookie so that any unauthorized user cannot acces the cookie.

```js
res.cookie("jwt", refreshToken, {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
});
//sending the access token via json because this lasts for a very short amount of time.
res.status(200).json({
  accessToken,
});
```

After doing this we can create a middlewar which verifies the token from the user.In the middleware folder we create a verifyJWT.js

```js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.sendStatus(401);
  }

  console.log(authHeader);

  const token = authHeader.split(" ")[1]; //"Bearer token" we need to access the token.

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) res.sendStatus(403); //forbidden
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
```
