const express = require("express");
const { generateNewShortUrl, GEtANalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", generateNewShortUrl);

module.exports = router;
