# Introduction

In this project we see how we can use the bcrypt.js library to use hashing. This enables us to store the password securely in our database. The main advantage of using bcrypt is that it can create different hash values for the same string everytime thus it becomes very difficult for any third person to trace back the actual password which the user has, so even in the cases where the has password is compromised , the third person still cannot use that to perform a brute force attack.

## Introduction to Hashing

Hashing is a process of converting plain text or data into a fixed-length string of characters, which typically represents a unique value for the given input. Hashing is widely used in computer security to securely store passwords, verify data integrity, and more.

## What is bcrypt?

Bcrypt is a popular and well-regarded library for securely hashing passwords in software applications. It is specifically designed for hashing passwords and is based on the Blowfish encryption algorithm. Bcrypt is preferred over basic hashing algorithms like MD5 and SHA-1 because it is slow and computationally intensive, making it resistant to brute-force and rainbow table attacks.

## Getting Started

To get started with bcrypt in a Node.js application, you'll need to install the `bcrypt` package from npm:

```bash
npm install bcrypt
```

After installing bcrypt, you can use it in your code as follows:

```javascript
const bcrypt = require("bcrypt");
```

# Functions that bcrypt Provides

Bcrypt provides the following main functions:

1. **`bcrypt.hash()`**: This function is used to hash a plaintext password. It takes the password and the number of salt rounds as input and returns the hashed password. Higher salt rounds make the hash more secure but slower to compute. Salt rounds means the password will be hashed that many times .eg if the salt round is 10 the password will be hashed 2^10 times , thus the higher the number of salt rounds the safer the password and slower the process.

2. **`bcrypt.compare()`**: This function is used to compare a plaintext password with a hashed password. It takes the plaintext password and the hashed password as input and returns `true` if they match or `false` if they don't.

# Example Code for bcrypt Functions

Here's an example of how to use `bcrypt.hash()` and `bcrypt.compare()`:

```javascript
const bcrypt = require("bcrypt");
const saltRounds = 10; // Number of salt rounds for hashing

const plainPassword = "mySecurePassword";

// Hash a password
bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
  } else {
    console.log("Hashed Password:", hash);
  }
});

// Verify a password
bcrypt.compare(plainPassword, hash, (err, result) => {
  if (err) {
    console.error("Error comparing password:", err);
  } else {
    if (result) {
      console.log("Password matches!");
    } else {
      console.log("Password does not match.");
    }
  }
});
```

There are more than one syntax of using the bcrypt methods or any other asynchronous code in js ,feel free to use any of the syntax you like.

```javascript
const bcrypt = require("bcrypt");
const password = "password123";

//syntax 1
const hashPwd = async (pwd) => {
  const hashed = await bcrypt.hash(pwd, 10);
  return hashed;
};
hashPwd(password)
  .then((hashed) => console.log(hashed))
  .catch((err) => console.log(err));

// syntax 2
bcrypt
  .hash(password, 10)
  .then((hash) => console.log(hash))
  .catch((err) => console.log(err));

//syntax 3
bcrypt.hash(password, 10, (err, hashed) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`The hashed password is: ${hashed}`);
  }
});
```
