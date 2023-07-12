const { StatusCodes } = require('http-status-codes');
const candidateProfiles = require('../models/candidateProfile.model');
const candidateResumes = require('../models/candidateResume.model');
const companyJobs = require("../models/companyJob.model")
const companyProfiles = require("../models/companyprofile.model");
const user = require('../models/user');
const { NotFoundError } = require('../errors');



const getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await user.find({});
        res.status(StatusCodes.OK).json({ Users: allUsers });
    } catch (error) {
        next(error);
    }
}
const getUser = async (req, res, next) => {
    try {
        const { userId: id } = req.params.id;
        const Auser = await user.find({ _id: id });
        const userResume = await candidateResumes.find({ user: id });
        const userProfile = await candidateProfiles.find({ user: id });
        const companyJob = await companyJobs.find({ user: id });
        const companyprofile = await companyProfiles.find({ user: id });
        if (!Auser) {
            throw new NotFoundError('user not found');
        }
        res.status(StatusCodes.OK).json({
            USER: Auser, UserProfile: userProfile, UserResume: userResume,
            Companyprofile: companyprofile, CompanyJob: companyJob
        });
    } catch (error) {
        next(error);
    }
}
const DeleteUser = async (req, res, next) => {
    try {
        const { userId: id } = req.params.id;
        const Auser = await user.findOneAndDelete({ _id: id });
        const userResume = await candidateResumes.findOneAndDelete({ user: id });
        const userProfile = await candidateProfiles.findOneAndDelete({ user: id });
        const CompanyProfile = await companyProfiles.findOneAndDelete({ user: id });
        const companyJob = await companyJobs.findOneAndDelete({ user: id });
        res.status(StatusCodes.OK).json('user deleted');
    } catch (error) {
        next(error);
    }
}
const getAllcandidates = async (req, res, next) => {
    try {
        const role = "candidate";
        const candidates = await user.find({ role: role });
        res.status(StatusCodes.OK).json({ CANDIDATES: candidates });
    } catch (error) {
        next(error);
    }
}
const getAllCompanies = async (req, res, next) => {
    try {
        const role = "company";
        const company = await user.find({ role: role });
        res.status(StatusCodes.OK).json({ COMPANY: company });
    } catch (error) {
        next(error);
    }
}
const getAllResume = async (req, res, next) => {
    try {
        const resumes = await candidateResumes.find({});
        res.status(StatusCodes.OK).json({ RESUMES: resumes });
    } catch (error) {
        next(error);
    }
}
const getAllProfile = async (req, res, next) => {
    try {
        const profiles = await candidateProfiles.find({});
        res.status(StatusCodes.OK).json({ PROFILES: profiles });
    } catch (error) {
        next(error);
    }
}
const getAllJobPost = async (req, res, next) => {
    try {
        const jobPosts = await companyJobs.find({});
        res.status(StatusCodes.OK).json({ JOB_POSTS: jobPosts });
    } catch (error) {
        next(error);
    }
}
const getAllCompanyProfiles = async (req, res, next) => {
    try {
        const profiles = await companyProfiles.find({});
        res.status(StatusCodes.OK).json({ COMPANY_PROFILES: profiles });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllUsers,
    getUser,
    DeleteUser,
    getAllcandidates,
    getAllCompanies,
    getAllResume,
    getAllProfile,
    getAllCompanyProfiles,
    getAllJobPost
}