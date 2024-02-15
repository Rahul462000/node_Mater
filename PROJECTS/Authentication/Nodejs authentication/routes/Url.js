const express = require("express");
const shortId = require("shortid");
const URLDAta = require("../models/Index");

const router = express.Router();

router.post("/", async (req, res) => {
  const bodyData = req.body;
  if (!bodyData.url)
    return res.status(404).json({ message: "url is required" });
  console.log(bodyData.url);
  const ShortID = shortId();
  console.log(ShortID);
  await URLDAta.create({
    shortId: ShortID,
    redirectUrl: bodyData.url,
    visitHistory: [],
  });
  return res.render("Home", { id: ShortID });
});

module.exports = router;
