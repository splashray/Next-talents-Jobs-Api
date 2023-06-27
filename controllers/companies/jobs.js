const JobPost = require("../../models/companies/jobs");
const _ = require("lodash");

// Controller for creating job post
const createJobsPost = async (req, res) => {
  try {
    const jobPost = new JobPost(req.body);
    const savedJobPost = await jobPost.save();
    res.status(201).json(savedJobPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to create the job post" });
  }
};
//controller for getting all job post
const getAllJobPost = async (req, res) => {
  try {
    const companyId = _.toString(req.params.userId).trim();
    const getSavedJobs = await JobPost.find({ user: companyId }); // Get all saved job post from the DB
    res.status(200).json(getSavedJobs);
  } catch (err) {
    res.status(500).json({ err: "failed to fetch all job posts" });
  }
};
// Controller to get a specific job post by ID
const getJobPostByID = async (req, res) => {
  try {
    const jobId = _.toString(req.params.id).trim();
    const getJobPost = await JobPost.findById(jobId);
    if (!getJobPost) {
      res.status(404).json("Jobs post not found");
    }
    res.status(200).json(getJobPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to fetch this job post" });
  }
};
// Controller to update a job post by ID
const updateJobPostByID = async (req, res) => {
  try {
    const jobId = _.toString(req.params.id).trim();
    const jobPostData = req.body;
    const updatedJobPost = await JobPost.findByIdAndUpdate(jobId, jobPostData, {
      new: true,
    });
    if (!updatedJobPost) {
      return res.status(404).json("Job post not found");
    }
    res.status(200).json(updatedJobPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Failed to update job post" });
  }
};

// Controller to delete a job post by ID
const deleteJobPostByID = async (req, res) => {
  try {
    const jobId = _.toString(req.params.id).trim();
    const deletedJobPost = await JobPost.findByIdAndRemove(jobId);
    if (!deletedJobPost) {
      return res.status(404).json({ error: "Job post not found" });
    }
    res.json(deletedJobPost);
  } catch (err) {
    res.status(500).json({ err: "Failed to delete job post" });
  }
};

module.exports = {
  createJobsPost,
  getAllJobPost,
  getJobPostByID,
  updateJobPostByID,
  deleteJobPostByID,
};
