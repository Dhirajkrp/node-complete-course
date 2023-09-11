## 1. Introduction to the Project Requirements.

We will discuss the requirement based on the backend application.
These will be the functionalities based on 3 major schemas or entities.

- User
- Questions
- Reports

For these schemas we need to provide the CRUD operation , like adding a new question , updating the uesr info such as their password or fetching all the questions based on a company or a language.

The remaining features involves filtering integrating multiple operations together such as fetching the reports of a specific student , or grouping the test reports based on the batch.
We will discuss this once we finalize the schema of these entities.
For now lets move on and see how we can setup a basic server and kick start our project.

## 2. Steps to Create the Backend Application

In this section, we will outline the steps to create the backend application using the Express.js framework.<br>
So whenever we are working in a nodejs application we used something called a `package.json` file. we can get this by using the command

```bash
npm init
```

This will provide with a basic `packag.json` file which contains the information about the project, i wont go in detail about why we need the `package.json` file , just one thing this helps us manage all the dependencies and packages of the project.

so we created a folder , named it `my-super-duper-application` and then we used the init command , what next? ,well lets try to create a server for the backend.

```js
// Import the 'http' module
const http = require("http");

// Define the hostname and port number
const hostname = "127.0.0.1"; // You can use 'localhost' as well
const port = 3000; // You can use any available port number

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the response header with a status code of 200 (OK) and content type
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  // Send a "Hello, World!" response to the client
  res.end("Hello, World!\n");
});

// Start the server and listen on the specified hostname and port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

looks familiar ??

good we are on the right track , lets try implementing some common routes to the server.

```js
const http = require("http");

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Route handling based on the request URL
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, World!");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About Us");
  } else if (req.url.startsWith("/profile/")) {
    const username = req.url.split("/profile/")[1];
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Profile of ${username}`);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Not Found");
  }
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
```

getting bored alredy ? , cool on the right track again , using node js to create a server is same as writing the code for a linked list in c ,then creating a stack then using it to reverse a string lol, be smart and use `.reverse()`.

So to create a server we will be using the expressjs in this project , you see when creating a server for a web application we need to follow some norms , like uisng the right status codes for the actions, using the content types , managing the routes, security , middleware and a ton of other things. Don't be scared , when we use express most of these is handled by the express server itself, such as determining the content-type , setting up the status codes for different methods, and a lot more.

To install any package use the command

```js
npm install <package_name>
//or
npm i <package_name>
```

To install exress use

```bash
npm install express.
```

### Steps to create an express server

**Step1:** Create a JavaScript file (e.g., `server.js`) where you'll define your Express server.

**Step 2: Import Express and Create an Express App:**
In `server.js`, import Express and create an instance of the Express application:

```javascript
const express = require("express");
const app = express();
```

**Step 3: Define a Basic Route:**
Define a basic route to test the server. For example:

```javascript
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
```

**Step 4: Start the Server:**
Start the server by listening on a specified port (e.g., 3000):

```javascript
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

So the complete code will be :

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

**Step 5: Run the Server:**
Run the server using the following command:

```bash
node server.js
```

You will see the message "Server is running on port 3000." You can access the server in your web browser at `http://localhost:3000`.

### Understanding Routes and Middleware

In Express, routes are used to define how the application responds to client requests. Middleware functions are functions that have access to the request and response objects and can perform actions before or after the request is handled by a route.

**Express Simplifies Routing:**

Compared to pure Node.js, Express simplifies routing by providing a clear and concise way to define routes and handle different HTTP methods (e.g., GET, POST, PUT, DELETE).

**Defining Routes and Using Middleware:**

Here's an example of defining a route that responds to a GET request:

```javascript
app.get("/api/users", (req, res) => {
  // Handle the GET request for the '/api/users' route here.
});
```

Middleware functions can be used to perform tasks such as logging, authentication, data validation, and more. Middleware is executed in the order it's defined in the application.

**2.3 Getting Familiar with Middlewares**

**Purpose and Usage of Middleware in Express:**
Middleware functions are essential in Express for processing requests and responses. They can modify request and response objects, end the request-response cycle, or call the next middleware function in the stack.

**Commonly Used Middleware:**
Two commonly used middleware are:

1. **CORS (Cross-Origin Resource Sharing):** It allows or restricts web applications running at one origin to make requests for resources from a different origin.
2. **JSON Middleware:** It parses incoming request bodies with JSON payloads.

**Example of Using Middleware:**
To use CORS middleware:

```javascript
const cors = require("cors");
app.use(cors());
```

To use JSON middleware to handle JSON data in incoming requests:

```javascript
app.use(express.json());
```

By understanding and using middleware effectively, you can enhance the functionality and security of your Express.js application.

## REST Architecture

In this section, we will dive into the REST (Representational State Transfer) architecture, which is the foundation of modern web APIs. We'll cover the basics of REST and best practices for designing RESTful APIs.

**Introduction to REST:**
REST is an architectural style for designing networked applications. It uses a set of constraints that provide a lightweight and efficient approach to designing web services. Key concepts in REST include resources, paths, endpoints, HTTP methods, and status codes.

**Resources and Paths:**

- In REST, everything is a resource. Resources can be entities like users, questions, reports, or any data your application deals with.
- Resources are identified by URLs (Uniform Resource Locators) or URIs (Uniform Resource Identifiers).
- Paths are the components of URLs that define the resource's location. For example, `/api/users` is the path to access the users' resource.

**Endpoints and HTTP Methods:**

- Endpoints are specific URLs that correspond to operations on a resource.
- HTTP methods (also known as HTTP verbs) are used to perform actions on resources. Common HTTP methods include:
  - GET: Retrieve data.
  - POST: Create a new resource.
  - PUT: Update an existing resource.
  - DELETE: Remove a resource.

**Examples of RESTful Routes:**
Here are examples of RESTful routes for a user resource:

- `GET /api/users`: Retrieve a list of all users.
- `GET /api/users/{userId}`: Retrieve a specific user by ID.
- `POST /api/users`: Create a new user.
- `PUT /api/users/{userId}`: Update a specific user by ID.
- `DELETE /api/users/{userId}`: Delete a specific user by ID.

**Best Practices for Designing RESTful APIs:**

1. Use Nouns for Resource Names: Choose resource names that represent entities (e.g., `/api/users` for users, `/api/questions` for questions).

2. Use Plural Nouns for Collections: For resources that represent collections, use plural nouns (e.g., `/api/users` instead of `/api/user`).

3. Version Your API: Include a version number in your API's URL to support backward compatibility (e.g., `/api/v1/users`).

4. Use Proper HTTP Methods: Utilize the appropriate HTTP methods for CRUD operations (GET, POST, PUT, DELETE).

5. Use Status Codes: Return meaningful HTTP status codes (e.g., 200 OK, 201 Created, 404 Not Found) to indicate the result of an operation.

**Naming Conventions for Routes and Endpoints:**

1. Use lowercase letters and hyphens for URLs (e.g., `/api/user-reports`).
2. Use plural nouns for resource names (e.g., `/api/users`).
3. Use camelCase for multi-word resource names in URLs (e.g., `/api/userReports`).
4. Avoid using spaces or special characters in URLs.
5. Keep URLs concise and descriptive.

**Consistency and Clarity:**
Consistency in API design is crucial for developers who consume your API. Ensure that similar resources and endpoints follow the same naming conventions and patterns. Provide clear and concise documentation to explain the purpose and usage of each endpoint.

By following these RESTful API best practices and naming conventions, you'll create APIs that are intuitive, easy to understand, and consistent, making them more user-friendly for developers and clients.

## 4. API's Used in the Application

In this section, we'll provide an overview of the APIs used in the "Placement Assessment Application." We'll break down the functionality of each API and how it contributes to the overall application.

**1 User API**
The User API is responsible for managing user-related data and interactions within the application.

**Functionality:**

- User Registration: Allows users to register for an account by providing their name, email, and password.
- User Authentication: Implements user authentication to secure access to the application.
- User Roles: Defines user roles, including students, editors, and administrators, to manage permissions and access levels.
- CRUD Operations: Provides API endpoints for Create, Read, Update, and Delete operations on user accounts.
- Access Control: Ensures proper access control based on user roles.

**API Endpoints:**

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Authenticate a user.
- `GET /api/users/profile`: Retrieve user profile information.
- `PUT /api/users/profile`: Update user profile.
- `DELETE /api/users/profile`: Delete user account.

**2 Questions API**
The Questions API manages questions, topics, and language-related data used in assessments.

**Functionality:**

- Question Management: Allows administrators to add, edit, and delete questions.
- Topics and Languages: Defines topics and programming languages associated with questions.
- Retrieval: Enables students to access questions based on topics, languages, and companies.
- Assessment: Provides questions for mock tests and assessments.
- Tagging: Allows questions to be categorized with tags for easy retrieval.

**API Endpoints:**

- `GET /api/questions`: Retrieve questions based on filters (e.g., topic, language, company).
- `POST /api/questions`: Add a new question.
- `PUT /api/questions/{questionId}`: Update a question.
- `DELETE /api/questions/{questionId}`: Delete a question.

**3 Report API**
The Report API handles test reports generated after students complete assessments.

**Functionality:**

- Report Generation: Generates detailed test reports for students.
- Performance Analysis: Analyzes student performance, identifies strengths and weaknesses, and provides recommendations.
- Batch Analysis: Offers administrators insights into the overall batch performance, including language proficiency and topic-wise performance.

**API Endpoints:**

- `GET /api/reports/{userId}`: Retrieve a student's test reports.
- `GET /api/reports/batch`: Retrieve batch-wise performance reports.
- `POST /api/reports`: Generate a new test report.

These APIs play a crucial role in providing a seamless learning and assessment experience for users of the "Placement Assessment Application." By understanding their functionalities and endpoints, developers can effectively integrate these APIs into the frontend and ensure smooth interaction with the backend.

## 5. Introduction to Mongoose

In this section, we'll introduce Mongoose, a powerful Object Data Modeling (ODM) library for MongoDB. Mongoose simplifies database operations by providing a structured way to define schemas, perform CRUD operations, and manage database connections. We'll cover the basics of using Mongoose in your "Placement Assessment Application."

**5.1 Schema Definition and CRUD Operations**

**Schema Definition:**

- In Mongoose, a schema defines the structure of documents within a MongoDB collection.
- Schemas define the fields, types, and validation rules for documents.

**CRUD Operations with Mongoose:**

- Mongoose provides methods for Create, Read, Update, and Delete (CRUD) operations on MongoDB documents.
- Examples of CRUD operations with Mongoose:
  - Create: `Model.create(data)`
  - Read: `Model.find(conditions)`
  - Update: `Model.updateOne(conditions, updateData)`
  - Delete: `Model.deleteOne(conditions)`

**5.2 Database Connectivity with Mongoose**

**Connecting to MongoDB:**

- To connect your Node.js application to MongoDB using Mongoose, you'll need to provide a MongoDB connection string.
- You can use the `mongoose.connect()` method to establish a connection.

**Example:**

```javascript
const mongoose = require("mongoose");

// Define the MongoDB connection string
const mongoURI = "mongodb://localhost/placement-assessment";

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
```

**5.3 Using the dotenv Package**

**Purpose of dotenv:**

- Storing sensitive information like database connection strings and API keys in your code can be insecure.
- The `dotenv` package allows you to store these configurations in environment variables.

**Usage:**

- Create a `.env` file in your project's root directory.
- Store sensitive information in the `.env` file in the format `KEY=VALUE`.
- Use the `dotenv` package to load these environment variables into your Node.js application.

**Example .env file:**

```plaintext
MONGO_URI=mongodb://localhost/placement-assessment
SECRET_KEY=mysecretkey
```

**Example of Using `dotenv` in Your Application:**

```javascript
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

const mongoURI = process.env.MONGO_URI;
const secretKey = process.env.SECRET_KEY;

// Use the environment variables as needed in your application
```

By integrating Mongoose and `dotenv` into your backend application, you can efficiently manage database interactions and secure sensitive information. This ensures that your "Placement Assessment Application" is both robust and secure when dealing with MongoDB and other sensitive data.

**6. Folder Structure and MVC Pattern**

In this section, we'll explore the folder structure and the adoption of the Model-View-Controller (MVC) pattern for organizing your "Placement Assessment Application" backend code. A well-structured folder layout and adherence to the MVC pattern can enhance code organization and maintainability.

**6.1 Introduction to Folder Structure**

**Importance of Folder Structure:**

- A well-organized folder structure simplifies code management and collaboration among team members.
- It promotes code separation, making it easier to locate and update specific components.

**Example Folder Structure:**
Here's an example folder structure for your backend application:

```plaintext
placement-assessment-backend/
  ├── config/
  │   ├── mongoose.js        # Mongoose configuration
  │   ├── passport.js        # Passport.js configuration for authentication
  │   └── ...
  ├── controllers/
  │   ├── userController.js  # User-related route handling
  │   ├── questionController.js # Question-related route handling
  │   └── ...
  ├── models/
  │   ├── User.js            # Mongoose model for User
  │   ├── Question.js        # Mongoose model for Question
  │   └── ...
  ├── routes/
  │   ├── userRoutes.js      # User-related routes
  │   ├── questionRoutes.js  # Question-related routes
  │   └── ...
  ├── middlewares/
  │   ├── authMiddleware.js  # Authentication middleware
  │   ├── validationMiddleware.js  # Request validation middleware
  │   └── ...
  ├── app.js                 # Express application setup
  ├── server.js              # Server initialization
  └── ...
```

**6.2 The MVC Pattern**

**What Is MVC?**

- MVC is a software architectural pattern commonly used for designing web applications.
- It separates an application into three interconnected components: Model, View, and Controller.

**Components of MVC:**

1. **Model:** Represents the application's data and business logic. It interacts with the database and performs CRUD operations.
2. **View:** Displays data to the user and handles user input. It is responsible for the presentation layer.
3. **Controller:** Acts as an intermediary between the Model and View. It processes user requests, retrieves data from the Model, and updates the View.

**Advantages of MVC:**

- Promotes code organization and separation of concerns.
- Enhances code maintainability and scalability.
- Facilitates parallel development by enabling multiple team members to work on different parts of the application.

**Example of Applying MVC:**

- In the example folder structure, you can place route handling logic in controllers (Controller), database models in the models (Model), and route definitions in routes (View).

**6.3 Applying the MVC Pattern**

**Controller Example:**

```javascript
// controllers/userController.js
const User = require("../models/User");

exports.getUserProfile = (req, res) => {
  // Logic to retrieve user profile data from the Model
  User.findById(req.user.id)
    .then((user) => {
      // Return user data as a JSON response
      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
};
```

**Model Example:**

```javascript
// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  // ... other fields
});

module.exports = mongoose.model("User", userSchema);
```

**Route Example:**

```javascript
// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Define user-related routes
router.get("/profile", userController.getUserProfile);

module.exports = router;
```

By adopting the MVC pattern and maintaining a well-structured folder layout, you can achieve better code organization, maintainability, and collaboration among your team members when developing the "Placement Assessment Application" backend.

**7. User Authentication**

In this section, we'll explore user authentication in the "Placement Assessment Application." User authentication is crucial for ensuring secure access to the application's features and data. We'll cover the following aspects of user authentication:

**7.1 Introduction to JWT (JSON Web Tokens)**

**What Is JWT?**

- JSON Web Tokens (JWT) are a compact, self-contained means of representing claims to be transferred between two parties.
- JWTs are commonly used for securely transmitting information between a client and a server.

**Authentication with JWT:**

- In the "Placement Assessment Application," JWTs are used for user authentication.
- When a user logs in or registers, a JWT is generated and sent to the client.
- The client includes the JWT in subsequent requests to access protected routes.

**7.2 Access Token and Refresh Token**

**Access Token:**

- An access token is a short-lived token that is used to access protected resources.
- It is included in the headers of API requests.
- Access tokens have a limited expiration time to enhance security.

**Refresh Token:**

- A refresh token is a longer-lived token used to obtain a new access token when it expires.
- It is securely stored on the client and should be protected.
- Refresh tokens provide a way to keep users authenticated without needing frequent logins.

**7.3 User Roles and Protected Routes**

**User Roles:**

- In the "Placement Assessment Application," users have different roles, such as students, editors, and administrators.
- User roles determine their access level and permissions within the application.

**Protected Routes:**

- Some routes and endpoints are protected and require a valid JWT to access.
- Middleware functions can be used to verify the JWT and the user's role before granting access.

**Example Middleware for Authorization:**

```javascript
// Middleware for protecting routes based on user roles
const authorize = (roles) => {
  return (req, res, next) => {
    const user = req.user; // User object obtained from the JWT
    if (!user || !roles.includes(user.role)) {
      // User is not authorized for this route
      return res.status(403).json({ error: "Forbidden" });
    }
    next(); // User is authorized, proceed to the route handler
  };
};
```

**Implementation Details:**

- When a user logs in, a JWT containing the user's ID and role is generated.
- The JWT is sent to the client and included in the headers of protected API requests.
- Middleware functions verify the JWT's validity and role, allowing or denying access to protected routes accordingly.

By implementing user authentication using JWT, access tokens, and refresh tokens, you can ensure that your "Placement Assessment Application" is secure, user-friendly, and provides controlled access to different user roles. This approach helps protect sensitive user data and application resources.
