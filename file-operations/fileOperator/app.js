const fs = require("node:fs/promises");
const { removeAllListeners } = require("node:process");

//commands

const CREATE_FILE = "create file";
const RENAME_FILE = "rename file";
const DELETE_FILE = "delete file";
const ADD_TO_FILE = "Add to file";

(async () => {
  // functions to handle file operations

  // function to create a new file
  async function createFile(filePath) {
    let existsAlready;
    try {
      existsAlready = await fs.open(filePath, "r");
      //the file already exists
      existsAlready.close();
      return console.log(`The File : ${filePath} , already exists`);
    } catch (error) {
      // the file does no exist and we have to create one.
      const newFile = await fs.open(filePath, "w");
      console.log("A new file was successfully created");
      newFile.close();
    }
    await fs.writeFile(filePath, "");
  }

  // function to delete a file
  function deleteFile(filePath) {
    console.log(`About to delete ${filePath}`);
  }

  // function to rename a file.
  async function renameFile(filePath, newPath) {
    console.log(`Renaming the file : ${filePath} to ${newPath}`);
  }

  // function to add content to a file.
  async function addToFile(filePath, content) {
    console.log(`Adding the content : ${content} to the file : ${filePath}`);
  }

  //opening the file
  const fileHandler = await fs.open("./commands.txt", "r");

  fileHandler.on("change", async () => {
    //get the size of the file
    const size = (await fileHandler.stat()).size;
    //allocate buffer for the content of the file.
    const buffer = Buffer.alloc(size);
    // setting up other options
    const offset = 0;
    const length = buffer.byteLength;
    const position = 0;

    // reding the whole content of the file.
    await fileHandler.read(buffer, offset, length, position);
    const command = buffer.toString("utf-8");

    //creating  a file using the command:
    //create a file <path>

    if (command.includes(CREATE_FILE)) {
      const path = command.split(" ").at(-1);
      createFile(path);
    }
    // deleting the file using the command
    //  delete file <path>
    if (command.includes(DELETE_FILE)) {
      const path = command.split(" ").at(-1);
      deleteFile(path);
    }

    // renaming a file using the command
    // rename file <oldPath> to <newPath>
    if (command.includes(RENAME_FILE)) {
      const oldPath = command.split(" ").at("-3");
      const newPath = command.split(" ").at("-1");
      renameFile(oldPath, newPath);
    }

    //
  });

  // watcher...
  const watcher = fs.watch("./commands.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      fileHandler.emit("change");
    }
  }
})();
