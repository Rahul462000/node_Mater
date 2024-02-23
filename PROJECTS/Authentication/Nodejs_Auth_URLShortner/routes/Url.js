const express = require("express");
const { CreateNewUrl } = require("../Controller/url");

const router = express.Router();

router.post("/", CreateNewUrl);

module.exports = router;
