const express = require("express");
const URL = require("../Models/Url");
const router = express.Router();

router.get("/", async (req, res) => {
  const AllUrl = await URL.find({});
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
