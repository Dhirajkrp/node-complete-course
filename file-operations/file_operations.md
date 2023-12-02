we use the 'fs' module to perform file operations such as reading, wrting creating deleting and updating files .

The file handling concept is not available in the core js language as it is a high end language it has no means of communicating with the operating system,

Then comes the v8 engine which enables us to exucute the javascript code , but even that does not provide any means of communicating with the os, it is just an execution engine.

In order to perform file operations and communicate with the os , node uses a c librabry which is known as **libuv** , this is another crucial part of the nodejs ecosystem along with the v8 engine and the event loop architecture.

To perform any file operation , node js uses the native methods provided by the libuv library , the fuction internally goes first to the library, finds its c implementation and then that function deals with the system calls to interact with the os, when the os responses back, the data is passed to the actual function call thruogh this library.

There are three ways of doing file operations in nodejs.

1. Using the Promises API.
2. Using the Callback API.
3. Using the Synchronous API.

For most of the cases it is advised to use the Promises API to perform the file handling , and only use the callback API when tike effeciency is very crucial as the callback API is faster than the Promises API but there are some trade offs for the memory usage . So generally it is good to stick with the Promises API.

### Using the Synchronous API

```js
const fs = require("node:fs");
const data = fs.readFileSync("./files/starter.txt", "utf-8");
console.log(data);
```

Notice that the sync api does not provides any proper means to handle any errors in the code, if we encounter an error the entire process will be terninated with an uncaught error.
We need to use try catch block to handle the errors in our code manually.

### Using the Callback API

```js
const fs = require("fs");

fs.readFile("./files/starter.txt", "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
});
```

This api is asynchronous and registers a callback function and waits for the result.the first paramaeter is the error and the second parameter is the data .

### Using the Primises API

```js
const fs = require("node:fs/promises");

fs.readFile("");
```

however wheh using sync there is no proper way of handling the errors.

### using path module

hard coding the path of the file can sometimes lead to errors thus we use the path module to define the path.

```js
const fs = require("fs");
const path = require("path");

fs.readFile(
  path.join(__dirname, "files", "starter.txt"),
  "utf8",
  (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
  }
);
```

### global path variables

1. \_\_dirname : this gives the current directory name .
2. \_\_filename : this gives the complete filepath of the defiend file.

Along with this we can use the path module to get other information about the file such as its name ,its extension , its relative path and many more.

```js
console.log(__dirname);
console.log(__filename);
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));
```

```js
C:\Users\Dhiraj\Desktop\nodeJs
C:\Users\Dhiraj\Desktop\nodeJs\index.js
index.js
.js
{
  root: 'C:\\',
  dir: 'C:\\Users\\Dhiraj\\Desktop\\nodeJs',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}

```

besides these we can create a file path using the path.join() method , in this we provide the path and then keep adding folders and file separated by a comma

rg:

```js
path.join(__dirname, "files", "starter.txt");
```

this will be interpreated ../files/starter.txt.

## other file operations

1. writeFile()

this takes the filename , the content and the callback function which handles the error.

```js
const fs = require("fs");
const path = require("path");

fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Hello world",
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);
```

2.appendFile()

this updates the content of the file , if the file does not exists , this will create a new file with the defined content.

```js
fs.appendFile(path.join(__dirname, "files", "test.txt"), "testing", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Append  complete");
});
```

### Performing multiple async operations.

lets say we want to create a new file and write something iniially and after the file is created we want to append some more content , in this case we have to add the second operation inside the first operations callback.

```js
const fs = require("fs");
const path = require("path");

fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Initial Data",
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Initial Write Complete");
    //performing append after the write operation
    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "\n\n some extra data",
      (err) => {
        if (err) {
          console.log(err);
        }
        console.log("Append  complete");
      }
    );
  }
);
```

lets say we want to rename the file after the append operation.

```js
const fs = require("fs");
const path = require("path");

fs.writeFile(
  path.join(__dirname, "files", "reply.txt"),
  "Initial Data",
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Initial Write Complete");
    //performing append after the write operation
    fs.appendFile(
      path.join(__dirname, "files", "reply.txt"),
      "\n\n some extra data",
      (err) => {
        if (err) {
          console.log(err);
        }
        console.log("Append  complete");

        // renaming the file

        fs.rename(
          path.join(__dirname, "files", "reply.txt"),
          path.join(__dirname, "files", "newRelpy.txt"),
          (err) => {
            if (err) {
              console.log(err);
            }

            console.log("File Renamed");
          }
        );
      }
    );
  }
);
```

as you can see this gets confusing really easily as the callbacks are clustered and nested.

this is also known as callback hell.

### using async await for handling asyncrronous operations.

we use a differnt module for this .

```js
require("fs").promises;
```

```js
const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

fileOps();
```

lets take the same example above of writing , appending and renaming the file and see how we can do the same thing using the async await.

```js
const fsPromises = require("fs").promises;
const path = require("path");

const fileOps = async () => {
  try {
    await fsPromises.writeFile(
      path.join(__dirname, "files", "demo.txt"),
      "This is an async operation"
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "demo.txt"),
      "Appending some additional content"
    );
    console.log("Append Operation completed");
    await fsPromises.rename(
      path.join(__dirname, "files", "demo.txt"),
      path.join(__dirname, "files", "newDemo.txt"),
      "files",
      "newdemo.txt"
    );
    console.log("Rename operation completed");

    const data = await fsPromises.
  } catch (err) {
    console.log(err);
  }
};

fileOps();
```

### using stream

When we are performing read write operations on a large file , it is better to use the stream api that allows us to process the data into small chunks rather than the whole data at once.

for this we use the createReadStream() and createWriteStream() methods of the fs module.

```js
const fs = require("fs");

const rs = fs.createReadStream("./files/lorem.txt", "utf8");

const ws = fs.createWriteStream("./files/newLorem.txt");

rs.on("data", (dataChunk) => {
  ws.write(dataChunk);
});
```

if we want to make it more effecient we can use pipe instead of the rs.on() method

```js
const fs = require("fs");

const rs = fs.createReadStream("./files/lorem.txt", "utf8");

const ws = fs.createWriteStream("./files/newLorem.txt");

rs.pipe(ws);
```

### working with directories

we use the mkdir() and rmdir() to create and remove the directory
further more we can use the .exists() to check if a file or folder exists or not , this is useful if we want to perform operations such as rename , copy etc.
