const express = require('express');
const audioController = require('../controller/audio.js');
const router = express.Router();
const { upload , handleFileUpload} = require('../middleware/multer.js');


// create - POST
router.post('/', upload.single('audio'), handleFileUpload, audioController.createNewAudio);

// Read - GET
// router.get('/', audioController.getAllAudio);


module.exports = router;
