/*
 * @module
 * @description
 * Main entry point for Common Utility
 *
 */

"use strict";
module.exports = {
  paginationUtil: function () {
    return require("./lib/pagination");
  },
  multerUtil: function () {
    return require("./lib/multer");
  },
  s3UploadUtil: function () {
    return require("./lib/s3-upload");
  },
  transcribingUtil: function () {
    return require("./lib/transcribing");
  },
  summarizingUtil: function () {
    return require("./lib/summarize");
  },
};
