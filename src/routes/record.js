const express = require("express");
const recordController = require("../controller/record");

const router = express.Router();

// Create
router.post(
  "/",
  recordController.createNewRecord
);

// Read
router.get("/", recordController.getAllRecords);
router.get("/:id", recordController.getRecordById);



// Delete
router.delete("/:recordingId", recordController.deleteRecord);

module.exports = router;
