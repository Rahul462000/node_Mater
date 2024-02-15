const express = require("express");
const URLDAta = require("../models/Index");
const router = express.Router();

router.get("/", async (req, res) => {
  const allURL = await URLDAta.find({});
  return res.render("Home", {
    urls: allURL,
  });
});

module.exports = router;
