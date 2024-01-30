const express = require("express");
const router = express.Router();
const {
  getALlUSer,
  createNEwUSer,
  getUsersById,
  DeleteUSer,
  EditUser,
} = require("../controllers/Index");

router.route("/").get(getALlUSer).post(createNEwUSer);
router.route("/:id").get(getUsersById).patch(EditUser).delete(DeleteUSer);

module.exports = router;
