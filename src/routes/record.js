const express = require("express");
const recordController = require("../controller/record");
const handleAudioRecord = require("../middleware/audioRecordUpload");
const upload = require("../config/multer");

const router = express.Router();

// Create
router.post(
  "/",
  upload.single("audio"),
  handleAudioRecord,
  recordController.createNewRecord
);

// Read
router.get("/", recordController.getAllRecords);
router.get("/:id", recordController.getRecordById);

// // Update patch
// router.patch(
//   "/:id",
//   upload.single("audio"),
//   handleAudioRecord,
//   recordController.updateRecord
// );

// Delete
router.delete("/:recordingId", recordController.deleteRecord);

module.exports = router;
