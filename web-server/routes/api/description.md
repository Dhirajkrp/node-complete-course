# Express.js API Router Documentation

## Overview

This documentation provides an overview of an Express.js API router designed to manage employee data. It demonstrates how to set up routes for handling various HTTP requests, including GET, POST, PUT, and DELETE. Additionally, it showcases the use of URL parameters for accessing specific employee records.

## Table of Contents

1. [Installation](#installation)
2. [Routes](#routes)
   - [GET /employees](#get-employees)
   - [POST /employees](#post-employees)
   - [PUT /employees](#put-employees)
   - [DELETE /employees](#delete-employees)
   - [GET /employees/:id](#get-employees-id)
3. [Usage](#usage)
4. [Contributing](#contributing)

## Installation<a name="installation"></a>

Before using this API router, ensure you have Node.js and Express.js installed. You can install the required dependencies using npm or yarn:

```bash
npm install express
```

## Routes<a name="routes"></a>

### GET /employees<a name="get-employees"></a>

- **Description:** Retrieve a list of all employees.
- **Request:** HTTP GET request to `/employees`.
- **Response:**
  - Status code 200: Returns a JSON array containing employee data.
  - Status code 400: Returns a JSON object with an error message if no employees are found.

### POST /employees<a name="post-employees"></a>

- **Description:** Add a new employee to the list.
- **Request:** HTTP POST request to `/employees` with a JSON body containing the employee's `firstname` and `lastname`.
- **Response:**
  - Status code 200: Returns a JSON object with the newly added employee's `firstname` and `lastname`.
  - Status code 400: Returns a JSON object with an error message if either `firstname` or `lastname` is missing in the request body.

### PUT /employees<a name="put-employees"></a>

- **Description:** Update an employee's information.
- **Request:** HTTP PUT request to `/employees` with a JSON body containing the `id`, `firstname`, and/or `lastname` to update.
- **Response:**
  - Status code 200: Returns a JSON object confirming the updates made.
  - Status code 400: Returns a JSON object with an error message if:
    - `id` is missing in the request body.
    - Neither `firstname` nor `lastname` is provided for update.

### DELETE /employees<a name="delete-employees"></a>

- **Description:** Delete an employee by their `id`.
- **Request:** HTTP DELETE request to `/employees` with a JSON body containing the `id` of the employee to delete.
- **Response:** Returns a JSON object with the `id` of the deleted employee.

### GET /employees/:id<a name="get-employees-id"></a>

- **Description:** Retrieve an employee's information by their `id`.
- **Request:** HTTP GET request to `/employees/:id` where `:id` is the unique identifier of the employee.
- **Response:** Returns a JSON object with the `id` of the requested employee.

## Usage<a name="usage"></a>

1. Import the router into your Express.js application.
2. Mount the router on a specific path in your application using `app.use('/api/employees', router)` where `'/api/employees'` is the base path for the API.

```javascript
const express = require("express");
const app = express();
const employeeRouter = require("./employeeRouter"); // Import the router
app.use("/api/employees", employeeRouter); // Mount the router
```

3. Start your Express.js server and access the API routes as described above.

This documentation provides a clear overview of how to use the Express.js API router for managing employee data. Ensure that your application and data structure align with the router's expectations to maximize its utility.
