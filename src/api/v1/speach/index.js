const appRoot = require("app-root-path");
const express = require("express");
const router = express.Router();
const speachController = require("./speach.controller");
const commonUtil = require(appRoot + "/src/utils/common-util");
const uploadUtil = commonUtil.multerUtil().upload;

router.post(
  "/upload-file",
  uploadUtil.single("audio"),
  speachController.uploadFile
);

router.post("/speach-to-text", speachController.speachToText);
router.post("/summarize-text", speachController.SummarizeText);

module.exports = router;
