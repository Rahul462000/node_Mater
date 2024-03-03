const express = require("express");
const URL = require("../Models/Url");
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const AllUrl = await URL.find({ createdBy: req.user._id });
  return res.render("Home", {
    urls: AllUrl,
  });
});

router.get("/register", (req, res) => {
  return res.render("Register");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;
