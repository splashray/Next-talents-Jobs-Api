const user = require('../models/user')
const candidateProfile = require('../models/candidateProfile.model')
const candidateResume = require('../models/candidateResume.model')
const companyJob = require('../models/companyJob.model')
const companyProfile = require('../models/companyprofile.model')



const candidateList = async (req, res, next) => {
    try {
        const role = "candidate";
        const candidateList = await user.find({ role: role });
        res.status(StatusCodes.OK).json({candidates:candidateList})
    } catch (error) {
        next(error);
    }
}
const jobList = async (req, res, next) => {
    try {
        const jobList = await companyJob.find({});
        res.status(StatusCodes.OK).json({jobs:jobList})
    } catch (error) {
        next(error);
    }
}
const companyList = async (req, res, next) => {
    try {
        const role = "company";
        const company = await user.find({ role: role });
        res.status(StatusCodes.OK).json({ COMPANY: company });
    } catch (error) {
        next(error);
    }
}
const getUser = async (req, res, next) => {
    try {
        const { userId: id } = req.params.id;
        const Auser = await user.find({ _id: id });
        const userResume = await candidateResume.find({ user: id });
        const userProfile = await candidateProfile.find({ user: id });
        const jobs = await companyJob.find({ user: id });
        const companyprofile = await companyProfile.find({ user: id });
        if (!Auser) {
            throw new NotFoundError('user not found');
        }
        res.status(StatusCodes.OK).json({
            USER: Auser, UserProfile: userProfile, UserResume: userResume,
            Companyprofile: companyprofile, CompanyJob: jobs
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {candidateList,jobList,getUser,companyList}