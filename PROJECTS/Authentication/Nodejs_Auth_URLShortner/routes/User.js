const express = require("express");
const USER = require("../Models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

// creating the user here
router.post("/", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let createdUSer = await USER.findOne({ email });
  if (createdUSer) {
    return res.redirect("/login");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  createdUSer = await USER.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
  });
  return res.render("Home");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let createUSER = await USER.findOne({ email });
  console.log("user", createUSER);
  if (!createUSER) return res.redirect("/register");
  const isMatch = await bcrypt.compare(password, createUSER.password);
  if (!isMatch) {
    return res.render("login", { email, message: "incorrect password" });
  }
  res.redirect("/");
});

module.exports = router;
