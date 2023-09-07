const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");

const cors = require("cors");
const PORT = process.env.PORT || 3500;

app.use(logger);

//these are the list of domains which can access our backend
const whiteList = [
  "https://www.yourdomain.com",
  "http://127.0.0.1",
  "http://localhost:3500",
];
//using cors : cross origin resource sharing
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//used to acess the form data.
app.use(express.urlencoded({ extended: false }));

//this is used to access any json data
app.use(express.json());

//used to serve public pages.
app.use(express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));
//providing the route for the initial pages.
app.use("/", require("./routes/root"));
//providing the route for subdir
app.use("/subdir", require("./routes/subdir"));

app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.send({ error: "404 Not found" });
  } else {
    res.type("txt").send("404 Not found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
