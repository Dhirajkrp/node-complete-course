// const fs = require("fs");
// const path = require("path");
// fs.readFile("./files/starter.txt", "utf8", (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
// });

// try {
//   const data = fs.readFileSync("./files/starter22.txt", "utf8");
//   console.log(data);
// } catch (err) {
//   console.log(err);
// }

// process.on("uncaughtException", (err) => {
//   console.log(`There was an error in the program:${err}`);
//   process.exit(1);
// });

// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf8",
//   (err, data) => {
//     if (err) {
//       throw err;
//     }
//     console.log(data);
//   }
// );

// console.log(__dirname);
// console.log(__filename);
// console.log("Path.dirname() : " + path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));

// console.log(path.parse(__filename));

// const fs = require("fs");
// const path = require("path");

// fs.writeFile(
//   path.join(__dirname, "files", "reply.txt"),
//   "Initial Data",
//   (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("Initial Write Complete");
//     //performing append after the write operation
//     fs.appendFile(
//       path.join(__dirname, "files", "reply.txt"),
//       "\n\n some extra data",
//       (err) => {
//         if (err) {
//           console.log(err);
//         }
//         console.log("Append  complete");

//         // renaming the file

//         fs.rename(
//           path.join(__dirname, "files", "reply.txt"),
//           path.join(__dirname, "files", "newRelpy.txt"),
//           (err) => {
//             if (err) {
//               console.log(err);
//             }

//             console.log("File Renamed");
//           }
//         );
//       }
//     );
//   }
// );

//*******  using the Synchronous API  to perform file operations operation.*************/

// const fs = require("node:fs");

// try {
//   console.time("read sycn");
//   const data = fs.readFileSync("./files/starter1.txt", "utf-8");
//   console.timeEnd("read sycn");
// } catch (err) {
//   console.log("something went wrong");
// }
// console.log("the program is still running");

// console.time("write sycn");
// for (let i = 1; i < 100000; i++) {
//   fs.appendFileSync("./files/starter.txt", ` ${i} `);
// }
// console.timeEnd("write sycn");

/**************************************************************************/

//using the callback api for performing the file operations.

// const fs = require("fs");

// fs.readFile("./files/starter.txt", "utf8", (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
// });

/********************************************** */
//using the PROMISES API

(async () => {
  const fs = require("node:fs/promises");
  const data = await fs.readFile("./files/starter.txt", "utf-8");
  console.log(data);
})();
