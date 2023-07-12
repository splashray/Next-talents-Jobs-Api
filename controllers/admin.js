const { StatusCodes } = require('http-status-codes');
const candidateProfiles = require('../models/candidateProfile.model');
const candidateResumes = require('../models/candidateResume.model');
const companyJobs = require("../models/companyJob.model");
const  companyProfiles  = require("../models/companyprofile.model");
const user = require('../models/user');
const { NotFoundError } = require('../errors');



const getAllUsers = async (req,res)=>{
    const allUsers = await user.find({});
    res.status(StatusCodes.OK).json({Users:allUsers});
}
const getUser = async (req,res)=>{
    const {userId:id} = req.params.id;
    const Auser = await user.find({_id:id});
    const userResume = await candidateResumes.find({user:id});
    const userProfile = await candidateProfiles.find({user:id});
    const companyJob = await companyJobs.find({user:id});
    const companyProfile = await companyProfiles.find({user:id});
    if(!Auser){
      throw new  NotFoundError('user not found');  
    }
    res.status(StatusCodes.OK).json({USER:Auser,UserProfile:userProfile,UserResume:userResume,
        Companyprofile:companyProfile,CompanyJob:companyJob});
}
const DeleteUser = async (req,res)=>{
    const {userId:id} = req.params.id;
    const Auser = await user.findOneAndDelete({_id:id});
    const userResume = await candidateResumes.findOneAndDelete({user:id});
    const userProfile = await candidateProfiles.findOneAndDelete({user:id});
    const CompanyProfile = await companyProfiles.findOneAndDelete({user:id});
    const companyJob = await companyJobs.findOneAndDelete({user:id});
    res.status(StatusCodes.OK).json('user deleted');
}
const getAllcandidates = async (req,res)=>{
    const role = "candidate";
    const candidates = await user.find({role:role});
    res.status(StatusCodes.OK).json({CANDIDATES:candidates});
}
const getAllCompanies = async (req,res)=>{
    const role = "company";
    const company = await user.find({role:role});
    res.status(StatusCodes.OK).json({COMPANY:company});
}
const getAllResume = async (req,res)=>{
    const resumes = await candidateResumes.find({});
    res.status(StatusCodes.OK).json({RESUMES:resumes});
}
const getAllProfile = async (req,res)=>{
    const profiles = await candidateProfiles.find({});
    res.status(StatusCodes.OK).json({PROFILES:profiles});
}
const getAllJobPost = async (req,res)=>{
    const jobPosts = await companyJobs.find({});
    res.status(StatusCodes.OK).json({JOB_POSTS:jobPosts});
}
const getAllCompanyProfiles = async (req,res)=>{
    const profiles = await companyProfiles.find({});
    res.status(StatusCodes.OK).json({COMPANY_PROFILES:profiles});
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