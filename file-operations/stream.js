const fs = require("fs");

const rs = fs.createReadStream("./files/lorem.txt", "utf8");

const ws = fs.createWriteStream("./files/newLorem.txt");

rs.pipe(ws);
