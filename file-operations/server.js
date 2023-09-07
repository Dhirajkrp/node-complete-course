//creating a server

const http = require("http");
const path = require("path");

const url = require("url");
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/") {
    console.log("This is the home page of the server");
  } else if (pathName === "/overview") {
    res.end("This is the overview page");
  } else if (pathName === "/products") {
    res.end("This is the products page");
  } else if (pathName === "/services") {
    res.end("This is the services page");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-oun-header": "hello-world",
    });
    res.end("<h1>page not found<h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to port 8000");
});
