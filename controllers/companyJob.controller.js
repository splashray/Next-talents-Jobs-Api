const JobPost = require("../models/companyJob.model");
const _ = require("lodash");

// Controller for creating job post
const createJobsPost = async (req, res,next) => {
  try {
    const jobPost = new JobPost(req.body);
    const savedJobPost = await jobPost.save();
    res.status(201).json(savedJobPost);
  } catch (error) {
    next(error);
}
}
//controller for getting all job post
const getAllJobPost = async (req, res,next) => {
  try {
    const company = req.user.userId
    const companyId = _.toString(company).trim();
    const getSavedJobs = await JobPost.find({ user: companyId }); // Get all saved job post from the DB
    res.status(200).json(getSavedJobs);
  } catch (error) {
    next(error);
}
}
// Controller to get a specific job post by ID
const getJobPostByID = async (req, res,next) => {
  try {
    const userId = req.user.userId;
    const jobId = _.toString(req.params.id).trim();
    const getJobPost = await JobPost.findById(jobId);
    if(userId != getJobPost.user)
    {
      res.status(401).json("unauthorized user")
    }
    if (!getJobPost) {
      res.status(404).json("Jobs post not found");
    }
    res.status(200).json(getJobPost);
  } catch (error) {
    next(error);
}
}
// Controller to update a job post by ID
const updateJobPostByID = async (req, res,next) => {
  try {
    const userId = req.user.userId;
    const jobId = _.toString(req.params.id).trim();
    const jobPostData = req.body;
    const getJobPost = await JobPost.findById(jobId);
    if(userId != getJobPost.user)
    {
      res.status(401).json("unauthorized user")
    }
    const updatedJobPost = await JobPost.findByIdAndUpdate(jobId, jobPostData, {
      new: true,
    });
    if (!updatedJobPost) {
      return res.status(404).json("Job post not found");
    }
    res.status(200).json(updatedJobPost);
  } catch (error) {
    next(error);
}
}
// Controller to delete a job post by ID
const deleteJobPostByID = async (req, res,next) => {
  try {
    const userId = req.user.userId;
    const jobId = _.toString(req.params.id).trim();
    const getJobPost = await JobPost.findById(jobId);
    if(userId != getJobPost.user)
    {
      res.status(401).json("unauthorized user")
    }
    const deletedJobPost = await JobPost.findByIdAndRemove(jobId);
    if (!deletedJobPost) {
      return res.status(404).json({ error: "Job post not found" });
    }
    res.json(deletedJobPost);
  } catch (error) {
    next(error);
}
}
module.exports = {
  createJobsPost,
  getAllJobPost,
  getJobPostByID,
  updateJobPostByID,
  deleteJobPostByID,
};