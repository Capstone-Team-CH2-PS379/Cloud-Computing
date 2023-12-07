const express = require('express');
const nativeController = require('../controller/native.js');
const router = express.Router();

// Create - POST
router.post('/', nativeController.createNewNative);

// Read - GET
router.get('/', nativeController.getAllNatives);

// Update - PATCH
router.patch('/:nativeAudioId', nativeController.updateNative);

// Delete - DELETE
router.delete('/:nativeAudioId', nativeController.deleteNative);

module.exports = router;
