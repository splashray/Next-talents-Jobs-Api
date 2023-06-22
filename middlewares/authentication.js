require('dotenv').config()
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')
const admin = require('../models/admin');



const auth = async (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('unthentication invalid')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token,process.env.JWTSECRET)
        req.user = {userId:payload.userId,name:payload.name}
        next()
    } catch (error) {
        throw new UnauthenticatedError('unthentication invalid')
    }
}

const checkAdmin = async (req,res, next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('unthentication invalid')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token,process.env.ADMINJWTSECRET)
        const temp = payload.adminId;
        const Admin = await admin.find({temp});
        if(!Admin){
            throw new UnauthenticatedError('unthentication invalid');
        }
        req.admin = {adminId:payload.adminId,adminName:payload.adminName}
        next()
    } catch (error) {
        throw new UnauthenticatedError('unthentication invalid')
    }
}

module.exports = {auth,checkAdmin}