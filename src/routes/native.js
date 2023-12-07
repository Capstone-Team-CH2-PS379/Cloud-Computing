const express = require('express');
const router = express.Router();
const nativeController = require('../controller/native.js');

//create - POST
router.post('/', nativeController.createNewNativeAudio);

//Read - GET
router.get('/', nativeController.getAllNativeAudio);

//UPDATE - PATCH
router.patch('/:idUser', nativeController.updateNativeAudio);

// Delete - delete
router.delete('/:idUser', nativeController.deleteNativeAudio);

module.exports = router;
