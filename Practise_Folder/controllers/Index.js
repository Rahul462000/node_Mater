const Users = require("../models/UserModel");
const fs = require("fs");

// 1.
async function getALlUSer(req, res) {
  const getAllUSers = await Users.find({});
  res.json(getAllUSers);
}

// 2.  with json file
// async function getUSeronId(req, res) {
//   const ID = Number(req.params.id);
//   const userID = Users.find((users) => users.id === ID);
//   return res.json(userID);
// }

// with mongodb database
async function getUsersById(req, res) {
  const userID = await Users.findById(req.params.id);
  if (!userID) return res.status(404).json({ error: "user not found" });
  return res.json(userID);
}
//

// 3.json data
// async function editUserOnID(req, res) {
//   const SearchID = Number(req.params.id);
//   const BODY = req.body;
//   const userID = Users.findIndex((user) => user.id === SearchID);
//   const userfound = Users[userID];
//   const updatedUserInfo = { ...userfound, ...BODY };
//   // for updating  the merged user infomration
//   Users[userID] = updatedUserInfo;
//   fs.writeFile("./User_Data.json", JSON.stringify(Users), (err, data) => {
//     return res.json({ status: "success", updatedUserInfo });
//   });
// }

// with mongodb
async function EditUser(req, res) {
  await Users.findByIdAndUpdate(req.params.id, { last_name: "changed" });
  return res.json({ status: "success" });
}

// 4. with json data
// async function deleteUSerwithID(req, res) {
//   const userID = Users.find((user) => user.id === Number(req.params.id));
//   if (!userID) res.status(404).send("the given id data doesn't exist");
//   const index = Users.indexOf(userID);
//   Users.splice(index, 1);
//   fs.writeFile("./User_Data.json", JSON.stringify(Users), (err, data) => {
//     return res.json({ status: 200, msg: "user deleted succesfully" });
//   });
// }

// with mongodb

async function DeleteUSer(req, res) {
  await Users.findByIdAndDelete(req.params.id);
  return res.json({ status: 200, msg: "user deleted succes" });
}

// 5.with json data
// async function createUSer(req, res) {
//   const BOdyDAta = req.body;
//   console.log(BOdyDAta);
//   Users.push({ ...BOdyDAta, id: Users.length + 1 });
//   fs.writeFile("./User_Data.json", JSON.stringify(Users), (err, data) => {
//     return res.json({ status: 200, msg: "success" });
//   });
// }

// with mongodb
async function createNEwUSer(req, res) {
  const bodyData = req.body;
  if (
    !bodyData ||
    !bodyData.first_name ||
    !bodyData.last_name ||
    !bodyData.email ||
    !bodyData.gender ||
    !bodyData.job_title
  ) {
    res.status(404).json({ message: "all fields required" });
  }
  const createNewUSer = await Users.create({
    first_name: bodyData.first_name,
    last_name: bodyData.last_name,
    email: bodyData.email,
    gender: bodyData.gender,
    job_title: bodyData.job_title,
  });
  console.log(createNewUSer);
  res.status(201).json({ msg: "user created successfully" });
}

module.exports = {
  getALlUSer,
  getUsersById,
  EditUser,
  DeleteUSer,
  createNEwUSer,
};
