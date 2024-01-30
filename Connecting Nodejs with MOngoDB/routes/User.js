const express = require("express");

const router = express.Router();
const {
  handleGEtAllUSErs,
  getUserByID,
  EditUser,
  DeleteUSer,
  CreateNewUSer,
} = require("../controllers/User");

router.route("/").get(handleGEtAllUSErs).post(CreateNewUSer);

router.route("/:id").get(getUserByID).patch(EditUser).delete(DeleteUSer);

module.exports = router;
