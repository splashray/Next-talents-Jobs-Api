const express = require("express");
const router = express.Router();
// //Middleware
// const isAdmin = require("../../middleware/adminMiddleware");

const profileController = require("../../controllers/companyProfile.controller");

// Update profile by ID
router.patch("/", profileController.updateProfile);


module.exports = router;