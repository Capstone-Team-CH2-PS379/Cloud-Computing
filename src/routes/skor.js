const express = require("express");
const skorController = require("../controller/skor.js");
const router = express.Router();

// Read - GET Leaderboard
router.get("/leaderboard", skorController.getLeaderboard);

// Read - GET Skor by ID
router.get("/:userId", skorController.getSkorById);

module.exports = router;
