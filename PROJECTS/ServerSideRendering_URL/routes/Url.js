const express = require("express");
const { handlenewUrl } = require("../controller/urls");

const router = express.Router();
router.post("/", handlenewUrl);

module.exports = router;
