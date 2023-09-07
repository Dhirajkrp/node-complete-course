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
  } catch (err) {
    console.log(err);
  }

  const data = await fsPromises.readFile(
    path.join(__dirname, "files", "newDemo.txt"),
    "utf8"
  );
  console.log(data);
  await fsPromises.unlink(path.join(__dirname, "files", "newDemo.txt"));
  console.log("File Deleted");
};

fileOps();
