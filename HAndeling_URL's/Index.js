const http = require("http");
const fs = require("fs");
const url = require("url");

const mySErver = http.createServer((req, res) => {
  console.log("NEw request recieve");
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.url} New request received \n`;
  const myURl = url.parse(req.url, true);
  console.log(myURl);
  fs.appendFile("text.txt", log, (err, data) => {
    switch (myURl.pathname) {
      case "/":
        res.end("Home Page ");
        break;
      case "/about":
        res.end(`Hi this is ${username}`);
        break;
      case "/enquiry":
        const username = myURl.query.myname;
        res.end(`Hi this is ${username}`);
        break;
      case "/search":
        const searchUrl = myURl.query.search_query;
        res.end(`Your item is ${searchUrl}`);
        break;
      default:
        res.end("404 Unknown page requested");
    }
  });
});

mySErver.listen(8000, () => console.log("server started"));
