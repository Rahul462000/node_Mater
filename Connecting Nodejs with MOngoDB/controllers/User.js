const User = require("../Models/UserModels");

async function handleGEtAllUSErs(req, res) {
  const allDbUsers = await User.find({});
  // NOTE: always add X to custom Header
  // res.setHeader("X-myName", "notorioussingh"); //this is a custom Header
  return res.json(allDbUsers); // this is how to get all the user data
}

async function getUserByID(req, res) {
  const userID = await User.findById(req.params.id); /// to get the ID by the user
  if (!userID) return res.status(404).json({ error: "user not found" });

  return res.json(userID);
}

async function EditUser(req, res) {
  await User.findByIdAndUpdate(req.params.id, { last_name: "changed" });

  return res.json({ status: "success" });
}

async function DeleteUSer(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "sucess" });
}

async function CreateNewUSer(req, res) {
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
}

module.exports = {
  handleGEtAllUSErs,
  getUserByID,
  EditUser,
  DeleteUSer,
  CreateNewUSer,
};
