const multer = require("multer");

module.exports = {
  upload: multer({
    storage: multer.memoryStorage(),
    filename: function (req, file, cb) {
      //req.body is empty...
      //How could I get the new_file_name property sent from client here?
      cb(null, file.originalname + "-" + Date.now() + ".mp3");
    },
  }),
};
