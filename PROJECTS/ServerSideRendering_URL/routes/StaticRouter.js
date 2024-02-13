const express = require("express");
const Url = require("../models/Url");
const router = express.Router();

router.get("/", async (req, res) => {
  const allURL = await Url.find({});
  return res.render("Home", {
    urls: allURL,
  });
});

module.exports = router;
