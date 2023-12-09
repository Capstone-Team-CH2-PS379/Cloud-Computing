const multer = require("multer");

const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 5 * 1000 * 1000, //5mb
  },
});

module.exports = upload;
