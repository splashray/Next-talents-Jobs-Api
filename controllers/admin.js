const { StatusCodes } = require("http-status-codes");
const candidateProfiles = require("../models/candidateProfile.model");
const candidateResumes = require("../models/candidateResume.model");
const companyJobs = require("../models/companyJob.model");
const companyProfiles = require("../models/companyprofile.model");
const user = require("../models/user");
const { NotFoundError } = require("../errors");
const handlePaginatedResults = require("../utils/handlePaginatedResults");


const getAllUsers = async (req, res) => {
  handlePaginatedResults(res, "Users", async () => {
    const allUsers = await user.find({});
    res.status(StatusCodes.OK).json({ Users: allUsers });
  });
};
const getUser = async (req, res) => {
  const { id } = req.params; // Get the user ID from req.params.id

  const Auser = await user.findOne({ _id: id });
  if (!Auser) {
    throw new NotFoundError("user not found");
  }
  const userResumeQuery = candidateResumes.find({ user: id });
  const userProfileQuery = candidateProfiles.find({ user: id });
  const companyJobQuery = companyJobs.find({ user: id });
  const companyprofileQuery = companyProfiles.find({ user: id });
  // If paginatedResults is not found, fallback to the previous behavior
  if (!res.paginatedResults) {
    const userResume = await userResumeQuery;
    const userProfile = await userProfileQuery;
    const companyJob = await companyJobQuery;
    const companyprofile = await companyprofileQuery;
    res.status(StatusCodes.OK).json({
      USER: Auser,
      UserProfile: userProfile,
      UserResume: userResume,
      Companyprofile: companyprofile,
      CompanyJob: companyJob,
    });
  }
};
const DeleteUser = async (req, res) => {
  try {
    const { userId: id } = req.params.id;
    const Auser = await user.findOneAndDelete({ _id: id });
    const userResume = await candidateResumes.findOneAndDelete({ user: id });
    const userProfile = await candidateProfiles.findOneAndDelete({ user: id });
    const CompanyProfile = await companyProfiles.findOneAndDelete({ user: id });
    const companyJob = await companyJobs.findOneAndDelete({ user: id });
    res.status(StatusCodes.OK).json("user deleted");
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getAllcandidates = async (req, res) => {
  const role = "candidate";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const { docs, totalDocs, hasNextPage, hasPrevPage, nextPage, prevPage } =
      await user.paginate({ role }, { page, limit });

    const response = {
      totalDocs,
      hasNextPage,
      hasPrevPage,
      nextPage,
      prevPage,
      CANDIDATES: docs,
    };

    res.status(StatusCodes.OK).json(response);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const getAllCompanies = async (req, res) => {
  const role = "employer";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const { docs, totalDocs, hasNextPage, hasPrevPage, nextPage, prevPage } =
      await user.paginate({ role }, { page, limit });

    const response = {
      totalDocs,
      hasNextPage,
      hasPrevPage,
      nextPage,
      prevPage,
      CANDIDATES: docs,
    };

    res.status(StatusCodes.OK).json(response);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const getAllResume = async (req, res) => {
  handlePaginatedResults(res, "RESUMES", async () => {
    const resumes = await candidateResumes.find({});
    res.status(StatusCodes.OK).json({ RESUMES: resumes });
  });
};
const getAllProfile = async (req, res) => {
  handlePaginatedResults(res, "PROFILES", async () => {
    const profiles = await candidateProfiles.find({});
    res.status(StatusCodes.OK).json({ PROFILES: profiles });
  });
};
const getAllJobPost = async (req, res) => {
  handlePaginatedResults(res, "JOB_POSTS", async () => {
    const jobPosts = await companyJobs.find({});
    res.status(StatusCodes.OK).json({ JOB_POSTS: jobPosts });
  });
};
const getAllCompanyProfiles = async (req, res) => {
  handlePaginatedResults(res, "COMPANY_PROFILES", async () => {
    const profiles = await companyProfiles.find({});
    res.status(StatusCodes.OK).json({ COMPANY_PROFILES: profiles });
  });
};

module.exports = {
  getAllUsers,
  getUser,
  DeleteUser,
  getAllcandidates,
  getAllCompanies,
  getAllResume,
  getAllProfile,
  getAllCompanyProfiles,
  getAllJobPost,
};