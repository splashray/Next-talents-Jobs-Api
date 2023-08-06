const express = require("express");
const router = express.Router();
const upload = require('../utils/multer')


//Middleware

const profileController = require("../controllers/candidateProfile.controller");
const resumeController = require('../controllers/candidateResume.controller');

// Update profile by ID
router.patch("/profile/upload", upload.single('profile-pics'),profileController.uploadProfilePics);
router.patch("/profile",profileController.updateProfile);


// GET /api/resumes
router.get('/resume', resumeController.getAllResumes);

// POST /api/resumes
router.post('/resume', resumeController.createResume);

// GET /api/resumes/:id
router.get('/resume/:id', resumeController.getResumeById);

// PUT /api/resumes/:id
router.patch('/resume/:id', resumeController.updateResume);

// DELETE /api/resumes/:id
router.delete('/resume/:id', resumeController.deleteResume);

module.exports = router;