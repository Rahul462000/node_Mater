const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
// const users = require("./User_Data.json"); // require the user data

const app = express();
const PORT = 8000;

// connecting the database

mongoose
  .connect("mongodb://127.0.0.1:27017/learning_APP1")
  .then(() => console.log("Database connection established"))
  .catch((err) => console.log("MongoDb error", err));

const USerSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    job_title: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", USerSchema);

// middleware use to take the input parameters from the user/ postman request
app.use(express.urlencoded({ extended: false }));

// custom build middlewares
// middleware 1
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}:${req.ip}:${req.method}:${req.path}\n`,
    (err, data) => {
      next(); // this will continue the response
    }
  );
});

// routes to get all the users (READ METHOD)
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({}); // this is the read method in the mongodb
  const html = `
  <ul>
  ${allDbUsers
    .map((USer) => `<li>${USer.first_name} + ${USer.email}</li>`)
    .join("")}
  </ul>
  `;
  res.send(html);
});

// THis is a REST API
app.get("/api/v1/users", async (req, res) => {
  const allDbUsers = await User.find({});
  // NOTE: always add X to custom Header
  // res.setHeader("X-myName", "notorioussingh"); //this is a custom Header
  return res.json(allDbUsers); // this is how to get all the user data
});

app
  .route("/api/v1/users/:id")
  .get(async (req, res) => {
    const userID = await User.findById(req.params.id); /// to get the ID by the user
    if (!userID) return res.status(404).json({ error: "user not found" });
    //   const html = `
    //   <ul>
    //   <li>${userID.first_name}</li>
    //   </ul>
    //   `;
    return res.json(userID);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { last_name: "changed" });

    return res.json({ status: "success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "sucess" });
  });

// REST API 3 for creating a new user

// api to create a new user
app.post("/api/v1/users", async (req, res) => {
  // to create a new user
  const BodyData = req.body;
  if (
    !BodyData ||
    !BodyData.first_name ||
    !BodyData.last_name ||
    !BodyData.email ||
    !BodyData.gender ||
    !BodyData.job_title
  ) {
    res.status(404).json({ message: "all fields are required" });
  }
  const NewUSer = await User.create({
    first_name: BodyData.first_name,
    last_name: BodyData.last_name,
    email: BodyData.email,
    gender: BodyData.gender,
    job_title: BodyData.job_title,
  });
  console.log(NewUSer);
  return res.status(201).json({ msg: "success" });
});

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
