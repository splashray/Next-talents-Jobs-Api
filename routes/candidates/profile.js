const express = require("express");
const router = express.Router();
// //Middleware
// const isAdmin = require("../../middleware/adminMiddleware");

const profileController = require("../../controllers/candidates/profile");

// Create a new user profile
router.post("/", profileController.createProfile);

// Update profile by ID
router.patch("/:id", profileController.updateProfile);


module.exports = router;
