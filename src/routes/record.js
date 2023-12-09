const express = require("express");
const recordController = require("../controller/record");
const handleAudioRecord = require("../middleware/audioRecordUpload");
const upload = require("../config/multer");

const router = express.Router();

router.post(
  "/",
  upload.single("audio"),
  handleAudioRecord,
  recordController.createNewRecord
);

module.exports = router;
