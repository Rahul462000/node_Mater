const express = require("express");
const fs = require("fs");
const users = require("./User_Data.json"); // require the user data

const app = express();
const PORT = 8000;

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

// routes
app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users
    .map((USer) => `<li>${USer.first_name} + ${USer.last_name}</li>`)
    .join("")}
  </ul>
  `;
  res.send(html);
});

// THis is a REST API
app.get("/api/v1/users", (req, res) => {
  return res.json(users); // this is how to get all the user data
});

app
  .route("/api/v1/users/:id")
  .get((req, res) => {
    const ID = Number(req.params.id);
    const userID = users.find((users) => users.id === ID);
    //   const html = `
    //   <ul>
    //   <li>${userID.first_name}</li>
    //   </ul>
    //   `;
    return res.json(userID);
  })
  .patch((req, res) => {
    const SearchID = Number(req.params.id);
    const BODY = req.body;
    const userID = users.findIndex((user) => user.id === SearchID);
    const userfound = users[userID];
    const updatedUserInfo = { ...userfound, ...BODY };
    // for updating  the merged user infomration
    users[userID] = updatedUserInfo;

    fs.writeFile("./User_Data.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success", updatedUserInfo });
    });
  })
  .delete((req, res) => {
    const userID = users.find((user) => user.id === Number(req.params.id));
    if (!userID)
      res.status(404).send("The user does not exist with the given ID");
    const index = users.indexOf(userID);
    users.splice(index, 1);
    fs.writeFile("./User_Data.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "sucess", users });
    });
  });

// REST API 3 for creating a new user

// api to create a new user
app.post("/api/v1/users", (req, res) => {
  // to create a new user
  const BodyData = req.body;
  console.log(BodyData);
  users.push({ ...BodyData, id: users.length + 1 });
  fs.writeFile("./User_Data.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "sucess" });
  });
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
