const express = require("express");
const router = express.Router();


const profileController = require("../../controllers/candidates/profile");

// Update profile by ID
router.patch("/", profileController.updateProfile);


module.exports = router;
