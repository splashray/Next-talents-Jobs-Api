const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require('../errors');
const Resume = require('../models/candidateResume.model');

// Get all resumes
async function getAllResumes(req, res,next) {
  try {
    // const resumes = await Resume.find();
    //Pagination.....
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const options = {
      page,
      limit,
    };

    const { docs, totalDocs, hasNextPage, hasPrevPage, nextPage, prevPage } =
      await Resume.paginate({}, options);
    const results = {
      totalDocs,
      hasNextPage,
      hasPrevPage,
      nextPage,
      prevPage,
      results: docs,
    };

    res.status(StatusCodes.OK).json(results);
  } catch (error) {
    next(error);
}
}

// Create a new resume
async function createResume(req, res,next) {
  try {
    const {
      user,
      title,
      contact,
      summary,
      education,
      experience,
      skills,
      certifications,
    } = req.body;

    const newResume = new Resume({
      user: req.user.userId,
      title,
      contact,
      summary,
      education,
      experience,
      skills,
      certifications,
    });

    const savedResume = await newResume.save();
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Resume created successfully", resume: savedResume });
  } catch (error) {
    next(error);
}
}

// Get a single resume by ID
async function getResumeById(req, res,next) {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return new NotFoundError('Resume not found');
    }
    res.status(StatusCodes.OK).json(resume);
  } catch (error) {
    next(error);
}
}

// Update a resume
async function updateResume(req, res,next) {
  try {
    const {
      title,
      contact,
      summary,
      education,
      experience,
      skills,
      certifications,
    } = req.body;

    const updatedResume = {
      title,
      contact,
      summary,
      education,
      experience,
      skills,
      certifications,
    };
    const user = req.user.userId;

    const resume = await Resume.findOneAndUpdate({ user }, updatedResume, {
      new: true,
      runValidators: true,
    });

    if (!resume) {
      return new NotFoundError('Resume not found');
    }

    res.status(StatusCodes.CREATED).json({ message: "Resume updated successfully", resume });
  } catch (error) {
    next(error);
}
}

// Delete a resume
async function deleteResume(req, res, next) {
  try {
    const user = req.user.userId;
    const resume = await Resume.findOneAndDelete({ user });

    if (!resume) {
      return new NotFoundError('Resume not found');
    }

    res.status(StatusCodes.GONE).json({ message: "Resume deleted successfully" });
  } catch (error) {
    next(error);
}
}

module.exports = {
  getAllResumes,
  createResume,
  getResumeById,
  updateResume,
  deleteResume,
};
