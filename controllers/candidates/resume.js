const Resume = require('../../models/candidates/resume');

// Get all resumes
async function getAllResumes(req, res) {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Create a new resume
async function createResume(req, res) {
  try {
    const { user, title, contact, summary, education, experience, skills, certifications } = req.body;

    const newResume = new Resume({
      user,
      title,
      contact,
      summary,
      education,
      experience,
      skills,
      certifications,
    });

    const savedResume = await newResume.save();
    res.status(201).json({ message: 'Resume created successfully', resume: savedResume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Get a single resume by ID
async function getResumeById(req, res) {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json(resume);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Update a resume
async function updateResume(req, res) {
  try {
    const { user, title,contact,summary, education, experience, skills, certifications } = req.body;

    const updatedResume = {
      user,
      title,
      contact,
      summary,
      education,
      experience,
      skills,
      certifications,
    };

    const resume = await Resume.findByIdAndUpdate(req.params.id, updatedResume, { new: true });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume updated successfully', resume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

// Delete a resume
async function deleteResume(req, res) {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = {
  getAllResumes,
  createResume,
  getResumeById,
  updateResume,
  deleteResume,
};