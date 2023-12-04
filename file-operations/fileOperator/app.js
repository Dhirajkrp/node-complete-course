const fs = require("node:fs/promises");

(async () => {
  const watcher = fs.watch("./commands.txt");

  //opening the file
  const fileHandler = await fs.open("./commands.txt", "r");
  const stat = await fileHandler.stat();
  console.log(stat);
  for await (const event of watcher) {
    if (event.eventType === "change") {
      console.log("the file has been modified");
      const size = (await fileHandler.stat()).size;
      const buffer = Buffer.alloc(size);
      const offset = 0;
      const length = buffer.byteLength;
      const position = 0;

      const content = await fileHandler.read(buffer, offset, length, position);
      console.log("Content of the file is:");
      console.log(content.buffer.toString("utf-8"));
    }
  }
})();
