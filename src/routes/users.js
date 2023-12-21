const express = require("express");
const usersController = require("../controller/users.js");
const router = express.Router();

// Create - POST - register
router.post("/register", usersController.createNewUsers);

// Read - GET
router.get("/", usersController.getAllUsers);
router.get("/:userId", usersController.getUserById);

// Update - PATCH
router.patch("/:userId", usersController.updateUsers);

// Delete - DELETE
router.delete("/:userId", usersController.deleteUsers);

//post login
router.post("/login", usersController.login);

module.exports = router;
