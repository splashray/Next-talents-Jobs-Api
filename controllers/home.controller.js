const user = require('../models/user')
const candiateProfile = require('../models/candidateProfile.model')
const candiateResume = require('../models/candidateResume.model')
const companyJob = require('../models/companyJob.model')
const companyProfile = require()



const candidateList = async (req,res)=>{
    const candiate = "candidate";
    const candiates = await user.find({role:candiate});
}