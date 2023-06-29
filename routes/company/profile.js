const express = require("express");
const router = express.Router();
// //Middleware
// const isAdmin = require("../../middleware/adminMiddleware");

const profileController = require("../../controllers/company/profile");

// Update profile by ID
router.patch("/", profileController.updateProfile);


module.exports = router;