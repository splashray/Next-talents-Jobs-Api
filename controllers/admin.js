const { StatusCodes } = require('http-status-codes');
const candidateProfiles = require('../models/candidates/profile');
const candidateResumes = require('../models/candidates/resume');
const user = require('../models/user');
const { NotFoundError } = require('../errors');



const getAllUsers = async (req,res)=>{
    const allUsers = await user.find({});
    res.status(StatusCodes.OK).json({Users:allUsers});
}
const getUser = async (req,res)=>{
    const {userId:id} = req.params;
    const Auser = await user.find({_id:userId});
    const userResume = await candidateResumes.find({user:userId});
    const userProfile = await candidateProfiles.find({user:userId});
    if(!Auser){
      throw new  NotFoundError('user not found');  
    }
    res.status(StatusCodes.OK).json({USER:Auser,UserProfile:userProfile,UserResume:userResume});
}
const DeleteUser = async (req,res)=>{
    const {userId:id} = req.params;
    const Auser = await user.findOneAndDelete({_id:userId});
    const userResume = await candidateResumes.findOneAndDelete({user:userId});
    const userProfile = await candidateProfiles.findOneAndDelete({user:userId});
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

module.exports = {
    getAllUsers,
    getUser,
    DeleteUser,
    getAllcandidates,
    getAllCompanies,
    getAllResume,
    getAllProfile
}