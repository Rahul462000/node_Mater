const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("This is a home page");
});
app.get("/about", (req, res) => {
  return res.send(
    "This is a about page" +
      " hey " +
      req.query.name +
      "the age is " +
      req.query.age
  );
});

app.listen(8000, (req, res) => console.log("server started"));
