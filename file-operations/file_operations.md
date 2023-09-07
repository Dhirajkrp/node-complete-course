we use the 'fs' module to perform file operations such as reading, wrting creating deleting and updating files .

there are two modes of performing these operations

1. synchronous
2. Asynchronous

when we use functions like readFileSync() , it will block the execution of the program until the operation is completed , whereas when we use readFile() this will be an asynchronous function which will take a callback function which will be executed when the async operation is completed.

```js
const fs = require("fs");

fs.readFile("./files/starter.txt", "utf8", (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
});
```

above is the async version , we can do the same in synchronous way

```js
const fs = require("fs");

const data = fs.readFileSync("./files/starter.txt", "utf8");

console.log(data);
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
