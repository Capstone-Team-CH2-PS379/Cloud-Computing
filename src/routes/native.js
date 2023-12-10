const express = require('express');
const nativeController = require('../controller/native.js');
const router = express.Router();
const upload = require("../config/multer.js");
const handleAudioNative = require("../middleware/audioNativeUpload.js");


// Create - POST
router.post('/', upload.single("audio"), handleAudioNative, nativeController.createNewNative);

// Read - GET
router.get('/', nativeController.getAllNatives);
router.get('/:nativeAudioId', nativeController.getNativeById);

// Update - PATCH
router.patch('/:nativeAudioId', upload.single("audio"), handleAudioNative, nativeController.updateNative);

// Delete - DELETE
router.delete('/:nativeAudioId', nativeController.deleteNative);

module.exports = router;
