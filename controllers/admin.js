const { StatusCodes } = require("http-status-codes");
const candidateProfiles = require("../models/candidateProfile.model");
const candidateResumes = require("../models/candidateResume.model");
const companyJobs = require("../models/companyJob.model");
const companyProfiles = require("../models/companyprofile.model");
const user = require("../models/user");
const { NotFoundError } = require("../errors");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await user.find({});
    res.status(StatusCodes.OK).json({ Users: allUsers });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const getUser = async (req, res) => {
  const { userId: id } = req.params.id;
  const Auser = await user.find({ _id: id });
  const userResume = await candidateResumes.find({ user: id });
  const userProfile = await candidateProfiles.find({ user: id });
  const companyJob = await companyJobs.find({ user: id });
  const companyProfile = await companyProfiles.find({ user: id });
  if (!Auser) {
    throw new NotFoundError("user not found");
  }
  res.status(StatusCodes.OK).json({
    USER: Auser,
    UserProfile: userProfile,
    UserResume: userResume,
    Companyprofile: companyProfile,
    CompanyJob: companyJob,
  });
};
const DeleteUser = async (req, res) => {
  try {
    const { userId: id } = req.params;
    const Auser = await user.findOneAndDelete({ _id: id });
    const userResume = await candidateResumes.findOneAndDelete({ user: id });
    const userProfile = await candidateProfiles.findOneAndDelete({ user: id });
    const CompanyProfile = await companyProfiles.findOneAndDelete({ user: id });
    const companyJob = await companyJobs.findOneAndDelete({ user: id });
    if (
      !Auser &&
      !userResume &&
      !userProfile &&
      !CompanyProfile &&
      !companyJob
    ) {
      throw new NotFoundError("User not found");
    }
    res.status(StatusCodes.OK).json({ message: "User deleted" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
const getAllcandidates = async (req, res) => {
  try {
    const role = "candidate";
    const candidates = await user.find({ role: role });
    res.status(StatusCodes.OK).json({ CANDIDATES: candidates });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const getAllCompanies = async (req, res) => {
  try {
    const role = "company";
    const companies = await user.find({ role: role });
    res.status(StatusCodes.OK).json({ COMPANY: companies });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const getAllResume = async (req, res) => {
  try {
    const resumes = await candidateResumes.find({});
    res.status(StatusCodes.OK).json({ RESUMES: resumes });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const getAllProfile = async (req, res) => {
  try {
    const profiles = await candidateProfiles.find({});
    res.status(StatusCodes.OK).json({ PROFILES: profiles });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const getAllJobPost = async (req, res) => {
  try {
    const jobPosts = await companyJobs.find({});
    res.status(StatusCodes.OK).json({ JOB_POSTS: jobPosts });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
};
const getAllCompanyProfiles = async (req, res) => {
  try {
    const profiles = await companyProfiles.find({});
    res.status(StatusCodes.OK).json({ COMPANY_PROFILES: profiles });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
  }
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
