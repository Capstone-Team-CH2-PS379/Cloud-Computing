const express = require('express');
const usersController = require('../controller/users.js');
const router = express.Router();

// Create - POST
router.post('/', usersController.createNewUsers);

// Read - GET
router.get('/', usersController.getAllUsers);

// Update - PATCH
router.patch('/:userId', usersController.updateUsers);

// Delete - DELETE
router.delete('/:userId', usersController.deleteUsers);

module.exports = router;
