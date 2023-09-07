Certainly! Let's provide more detailed descriptions for each section of the documentation:

---

# Express Application Documentation

## Overview

This documentation provides an in-depth explanation of the structure and functionality of the Node.js Express application. The application is designed to serve static web pages, handle Cross-Origin Resource Sharing (CORS) requests, log events, and manage errors effectively.

## Table of Contents

1. [Application Setup](#1-application-setup)
2. [CORS Configuration](#2-cors-configuration)
3. [Middleware](#3-middleware)
4. [Static Content Serving](#4-static-content-serving)
5. [Route Handling](#5-route-handling)
6. [Error Handling](#6-error-handling)
7. [Server Start](#7-server-start)

---

## 1. Application Setup <a name="1-application-setup"></a>

### Dependencies

- `express`: This is a popular Node.js framework used to simplify the development of web applications. It provides tools for routing, middleware, and handling HTTP requests and responses.
- `path`: This is a built-in Node.js module that helps in working with file and directory paths.
- `logger`: A custom middleware for logging events, which can be used for debugging and monitoring the application.
- `errorHandler`: Another custom middleware that handles errors gracefully.
- `cors`: Middleware for enabling Cross-Origin Resource Sharing (CORS), allowing specified domains to access resources on the server.
- `PORT`: A configuration variable to specify the port number on which the server will listen.

### Configuration

- The application listens on a port defined by the `PORT` environment variable or defaults to port `3500`. This allows for flexibility in deployment environments.

```javascript
const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const PORT = process.env.PORT || 3500;
```

---

## 2. CORS Configuration <a name="2-cors-configuration"></a>

### Cross-Origin Resource Sharing (CORS)

- Cross-Origin Resource Sharing (CORS) is configured to control which domains can access the server's resources. This is a security measure to prevent unauthorized access from different origins.
- The `whiteList` array contains the domains that are allowed to access the server.
- The `corsOptions` object is used to configure the CORS middleware. It checks the origin of incoming requests against the `whiteList` and responds accordingly.

```javascript
const whiteList = [
  "https://www.yourdomain.com",
  "http://127.0.0.1",
  "http://localhost:3500",
];

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
```

---

## 3. Middleware <a name="3-middleware"></a>

### Logging Middleware

- A custom logging middleware `logger` is used to log events in the application. It can log important information about incoming requests, making it easier to trace and debug issues during development.

```javascript
app.use(logger);
```

### Body Parsing Middleware

- Middleware to parse URL-encoded and JSON data from incoming requests. This is essential for extracting data from HTTP requests.

```javascript
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
```

---

## 4. Static Content Serving <a name="4-static-content-serving"></a>

- The application serves static web pages from the `public` directory using Express's built-in middleware. This allows the application to serve HTML, CSS, JavaScript, and other static assets to clients.

```javascript
app.use(express.static(path.join(__dirname, "/public")));
```

---

## 5. Route Handling <a name="5-route-handling"></a>

### Routing

- Various routes are defined to handle incoming requests. Each route is associated with a specific action or resource on the server.

```javascript
app.get("^/$|/index(.html)?", (req, res) => {
  // Serving the index.html page
});

app.get("/new-page(.html)?", (req, res) => {
  // Serving the new-page.html page
});

app.get("/old-page(.html)?", (req, res) => {
  // Redirecting to new-page.html with a 301 status code
});

app.get("/user", (req, res) => {
  // Serving the index.html page from the "subdir" directory
});

app.get("/chain(.html)?", [one, two, three]); // Middleware chain
```

### Middleware Chain

- A middleware chain is created using `[one, two, three]` to handle the `/chain(.html)?` route. Middleware functions are executed sequentially, allowing for modular request handling.

---

## 6. Error Handling <a name="6-error-handling"></a>

- A custom error handling middleware `errorHandler` is used to manage errors. This middleware catches and handles errors gracefully, ensuring that the server responds appropriately even in unexpected situations.

```javascript
app.all("/*", (req, res) => {
  // Handling 404 Not Found errors
});

app.use(errorHandler);
```

---

## 7. Server Start <a name="7-server-start"></a>

- The server is started and listens on the defined `PORT`. Once started, the server is ready to accept incoming requests from clients.

```javascript
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---
