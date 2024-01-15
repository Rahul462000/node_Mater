const fs = require("fs");
const os = require("os");

// synchronous call or blocking request
// fs.writeFileSync("./test.txt", "HEy there");

// asynchronous call or non blocking request
// fs.writeFile("./test.txt", "HEy there", (err) => {});

// synchronous read file
// const Result = fs.readFileSync("./contact.txt", "utf-8");
// console.log(Result);

// asynchronous read file
// fs.readFile("./contact.txt", "utf-8", (err, rsult) => {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log(rsult);
//   }
// });

// append the file data
// fs.appendFileSync("./test.txt", new Date().getDate().toLocaleString());
// fs.appendFileSync("./test.txt", `${Date.now(new Date())}Hey there\n`);
// copy a file data into another file
// fs.cpSync("./test.txt", "./copy.txt");
// delete a file
// fs.unlinkSync("./copy.txt");
// statisTICS OF A FILE
// console.log(fs.statSync("./test.txt").isFile());

// to make a directory with file insdie of it
// fs.mkdirSync("my-docs/a/b", { recursive: true });

console.log(os.cpus().length);
