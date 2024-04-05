const { v4: uuidv4 } = require("uuid");
const express = require("express");
const USER = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { setUser } = require("../service/auth");

const router = express.Router();
const app = express();

app.use(cookieParser());

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
  return res.redirect("/");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let createUSER = await USER.findOne({ email });
  // console.log("user", createUSER);
  if (!createUSER) return res.status(201).redirect("/Register");
  const isMatch = await bcrypt.compare(password, createUSER.password);
  if (!isMatch) {
    return res.render("login", { email, error: "incorrect password" });
  }
  // const sessionID = uuidv4(); /// 1. a session ID for a user
  // setUser(sessionID, createUSER); //2. to store this session ID with this user object
  // res.cookie("uid", sessionID); //3. setting the cookie inside the double bracket

  // now we will use the statless authentication with jsonwebtoken
  const token = setUser(createUSER);
  res.cookie("token", token); // we can add domain, and expire time of the cookie after the token,
  return res.redirect("/");
  // return res.json({ token });
});

module.exports = router;
