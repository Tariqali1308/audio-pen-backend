const express = require("express");
const router = express.Router();
const speach = require("./speach");

router.use("/speach", speach);

module.exports = router;
