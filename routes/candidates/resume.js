const express = require('express');
const router = express.Router();
const resumeController = require('../../controllers/candidates/resume');

// GET /api/resumes
router.get('/', resumeController.getAllResumes);

// POST /api/resumes
router.post('/', resumeController.createResume);

// GET /api/resumes/:id
// router.get('/', resumeController.getResumeById);

// PUT /api/resumes/:id
router.patch('/', resumeController.updateResume);

// DELETE /api/resumes/:id
router.delete('/', resumeController.deleteResume);

module.exports = router;