const express = require("express");
const router = express.Router();
//Middleware
const isAdmin = require("../middleware/adminMiddleware");

const UserController = require("../controllers/user.controller");

//Create/Register  a user
router.post("/user", UserController.createUser);
//Get user by id
router.get("/user/:Id", UserController.getUserById);
//Accessible by User
// Create user profile
router.get("/profile/:Id/new", UserController.newProfile);
router.post("/profile/:Id", UserController.newProfile);

// Update user profile
router.get("/profile/:Id/edit", UserController.editProfile);
router.post("/profile/:Id/edit", UserController.editProfile);

// Display user profile
router.get("/profile/:Id", UserController.showProfile);

//Accessible by Admin
// Display all users profile
router.get("/profile", UserController.showAllProfiles);

// Delete user profile
router.delete("/profile/:Id", isAdmin, UserController.deleteProfile);

module.exports = router;
