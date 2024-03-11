const express = require("express");
const URL = require("../Models/Url");
const router = express.Router();

//  this is the static route for the main PAGE of the application
router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const AllUrl = await URL.find({ createdBy: req.user._id });
  return res.render("Home", {
    urls: AllUrl,
  });
});
// ends here

// this is the register function static route
router.get("/register", (req, res) => {
  return res.render("Register");
});
//ends here

// this is the login function static route
router.get("/login", (req, res) => {
  return res.render("login");
});
//ends here

module.exports = router;
