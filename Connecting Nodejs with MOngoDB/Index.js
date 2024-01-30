const express = require("express");
// const fs = require("fs");
// const mongoose = require("mongoose");
const UserRouter = require("./routes/User");
const { connectMongoDB } = require("./DB/connection");
const { logREqREs } = require("./middleware/Index");
// const users = require("./User_Data.json"); // require the user data

const app = express();
const PORT = 8000;

// connecting the database

connectMongoDB("mongodb://127.0.0.1:27017/learning_APP1").then(() =>
  console.log(`database connection established`)
);

// middleware use to take the input parameters from the user/ postman request
app.use(express.urlencoded({ extended: false }));

// custom build middlewares
// middleware 1
app.use(logREqREs("log.txt"));

// routes to get all the users (READ METHOD)
// app.get("/users", async (req, res) => {
//   const allDbUsers = await User.find({}); // this is the read method in the mongodb
//   const html = `
//   <ul>
//   ${allDbUsers
//     .map((USer) => `<li>${USer.first_name} + ${USer.email}</li>`)
//     .join("")}
//   </ul>
//   `;
//   res.send(html);
// });

// THis is a REST API\
app.use("/api/users", UserRouter);

app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});

// rest api
// store json data
// get /user- to get allusers data
// get /user1- get user with id 1
// get /user2- get user with id 2
// post /user -create new user
// patch /user1 -  edit the user with id 1
// delete /user/id - delete the user with id
