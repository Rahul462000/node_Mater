const fs = require("fs");

function logREqREs(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()}:${req.ip}:${req.method}:${req.path}\n`,
      (err, data) => {
        next(); // this will continue the response
      }
    );
  };
}

module.exports = { logREqREs };
