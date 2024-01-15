const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  //   console.log("NEw REquest REceived");
  const log = `${Date.now()}: ${req.url} New Request received \n`;
  fs.appendFile("log.txt", log, () => {
    switch (req.url) {
      case "/":
        res.end("hello from home page");
        break;
      case "/about":
        res.end("this is about page");
        break;
      default:
        res.end("404 Page not found");
    }
  });
  //   console.log(req.headers);
});

myServer.listen(8000, () => console.log("server started!"));
