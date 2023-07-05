const express = require("express");
const router = express.Router();
// //Middleware
// const isAdmin = require("../../middleware/adminMiddleware");

const profileController = require("../controllers/candidateProfile.controller");
const resumeController = require('../controllers/candidateResume.controller');

// Update profile by ID
router.patch("/profile", profileController.updateProfile);



// GET /api/resumes
router.get('/resume', resumeController.getAllResumes);

// POST /api/resumes
router.post('/resume', resumeController.createResume);

// GET /api/resumes/:id
// router.get('/', resumeController.getResumeById);

// PUT /api/resumes/:id
router.patch('/resume', resumeController.updateResume);

// DELETE /api/resumes/:id
router.delete('/resume', resumeController.deleteResume);

module.exports = router;