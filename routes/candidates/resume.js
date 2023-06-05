const express = require('express');
const router = express.Router();
const resumeController = require('../../controllers/candidates/resume');

// GET /api/resumes
router.get('/', resumeController.getAllResumes);

// POST /api/resumes
router.post('/', resumeController.createResume);

// GET /api/resumes/:id
router.get('/:id', resumeController.getResumeById);

// PUT /api/resumes/:id
router.put('/:id', resumeController.updateResume);

// DELETE /api/resumes/:id
router.delete('/:id', resumeController.deleteResume);

module.exports = router;