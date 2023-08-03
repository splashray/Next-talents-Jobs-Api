const { StatusCodes } = require("http-status-codes");
const JobPost = require("../models/companyJob.model");
const _ = require("lodash");

// Controller for creating job post
const createJobsPost = async (req, res) => {
  try {
    const jobPost = new JobPost(req.body);
    const savedJobPost = await jobPost.save();
    res.status(StatusCodes.CREATED).json(savedJobPost);
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ err: "Failed to create the job post" });
  }
};
//controller for getting all job post
const getAllJobPost = async (req, res) => {
  try {
    const company = req.user.userId;
    const companyId = _.toString(company).trim();
    //Pagination.....
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const options = {
      page,
      limit,
    };

    const { docs, totalDocs, hasNextPage, hasPrevPage, nextPage, prevPage } =
      await JobPost.paginate({ user: companyId }, options);
    const results = {
      totalDocs,
      hasNextPage,
      hasPrevPage,
      nextPage,
      prevPage,
      results: docs,
    };
    // const getSavedJobs = await JobPost.find({ user: companyId }); // Get all saved job post from the DB
    res.status(StatusCodes.OK).json(results);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ err: "failed to fetch all job posts" });
  }
};
// Controller to get a specific job post by ID
const getJobPostByID = async (req, res) => {
  try {
    const userId = req.user.userId;
    const jobId = _.toString(req.params.id).trim();
    const getJobPost = await JobPost.findById(jobId);
    if (userId != getJobPost.user) {
      res.status(StatusCodes.UNAUTHORIZED).json("unauthorized user");
    }
    if (!getJobPost) {
      res.status(StatusCodes.NOT_FOUND).json("Jobs post not found");
    }
    res.status(StatusCodes.OK).json(getJobPost);
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ err: "Failed to fetch this job post" });
  }
};
// Controller to update a job post by ID
const updateJobPostByID = async (req, res) => {
  try {
    const userId = req.user.userId;
    const jobId = _.toString(req.params.id).trim();
    const jobPostData = req.body;
    const getJobPost = await JobPost.findById(jobId);
    if (userId != getJobPost.user) {
      res.status(StatusCodes.UNAUTHORIZED).json("unauthorized user");
    }
    const updatedJobPost = await JobPost.findByIdAndUpdate(jobId, jobPostData, {
      new: true,
    });
    if (!updatedJobPost) {
      return res.status(StatusCodes.NOT_FOUND).json("Job post not found");
    }
    res.status(StatusCodes.OK).json(updatedJobPost);
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ err: "Failed to update job post" });
  }
};
// Controller to delete a job post by ID
const deleteJobPostByID = async (req, res) => {
  try {
    const userId = req.user.userId;
    const jobId = _.toString(req.params.id).trim();
    const getJobPost = await JobPost.findById(jobId);
    if (userId != getJobPost.user) {
      res.status(StatusCodes.UNAUTHORIZED).json("unauthorized user");
    }
    const deletedJobPost = await JobPost.findByIdAndRemove(jobId);
    if (!deletedJobPost) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Job post not found" });
    }
    res.status(StatusCodes.GONE).json(deletedJobPost);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ err: "Failed to delete job post" });
  }
};
module.exports = {
  createJobsPost,
  getAllJobPost,
  getJobPostByID,
  updateJobPostByID,
  deleteJobPostByID,
};
