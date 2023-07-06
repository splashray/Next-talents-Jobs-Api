const user = require('../models/user')
const userOtp = require('../models/userOtp.verification')
const jwt = require('jsonwebtoken')
const admin = require('../models/admin')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { sendVerificationEmail, resendOtpVerificationCode, 
    sendOtpVerificationEmail,otpVerification } = require('../utils/email');
const bcrypt = require('bcryptjs');

const register = async (req, res, next) => {
    try {
        const USER = await user.create({ ...req.body })
        const token = USER.createJwt();
        const link = `${process.env.SITEURL}/auth/register/${token}`
        await sendVerificationEmail({ _id: USER._id, email:USER.email }, link, res);
        const email = USER.email
        req.user = { userId: USER._id, User: USER }
        req.email = email
        req.token = token
        next()
    } catch (error) {
        console.log(error);
    }
}
const verifyNewUser = async (req, res) => {
    try {
        const token = req.params.token;
        const payload = jwt.verify(token,process.env.JWTSECRET)
        const User = {userId:payload._id,email:payload.email}
        if(!User){
            throw new UnauthenticatedError("user not found")
        }
        const foundUser = user.findOne({email:User.email});
        await user.findOneAndUpdate({_id:User.userId},{isVerified:true},{new:true,runValidators: true})
        const newToken = await foundUser.createJwt();
        res.status(StatusCodes.OK).json({message:"user is now verified",token:newToken});
    } catch (error) {
        throw new UnauthenticatedError('unauthenticated')
    }
}
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('please provide email and password')
    }
    const USER = await user.findOne({ email })
    if (!USER) {
        throw new UnauthenticatedError('please provide a vailid email')
    }
    const isVerified = USER.isVerified;
    if(!isVerified){
        throw new UnauthenticatedError('user is not verified kindly check your mail to verify')
    }
    const isPaswordCorrect = await USER.comparePassword(password);
    if (!isPaswordCorrect) {
        throw new UnauthenticatedError('incorrect password')
    }
    const token = USER.createJwt()
    res.status(StatusCodes.OK).json({ USER, token: token })
}
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if(!email){
            throw new Error('please provide email')
        }
        const foundUser = await user.findOne({ email: email });
        if (!foundUser) {
            throw new Error("User not found");
        } else {
            const token = await foundUser.createJwt();
            const link = `${process.env.SITEURL}/auth/verifytoken/${token}`
            await sendVerificationEmail({ _id: foundUser._id, email }, link, res);
        }
    } catch (error) {
        res.json({ error: error.message });
    }
};
const verifyToken = async (req,res)=>{
    try {
        const token = req.params.token;
        const payload = jwt.verify(token,process.env.JWTSECRET)
        const User = {userId:payload._id,email:payload.email}
        if(!User){
            throw new UnauthenticatedError("user not found")
        }
        const email = User.email
        const foundUser = await user.findOne({email:email})
        const newToken = await foundUser.createJwt();
        res.status(StatusCodes.OK).json({message:"verified user",token:newToken});
    } catch (error) {
        throw new UnauthenticatedError('unauthenticated')
    }
}
const resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;
        const email = req.email
        if (!password || !confirmPassword) {
            throw new Error("please enter password and confirm to proceed")
        }
        if (password != confirmPassword) {
            throw new Error("both passsword doesn't not match please check and try again")
        }
        const newPassword = await user.findOneAndUpdate({ email: email }, { password },
            { new: true, runValidators: true });
        res.status(200).json({
            status: `successful`,
            message: `password successfully changed`
        })
    } catch (error) {
        res.json(error.message)
    }
}
const googleRegister = async (req, res, next) => {
    console.log(req.user.profile);
    const profile = req.user.profile
    const info = {
        name: profile.given_name,
        email: profile.email,
        password: profile.family_name,
        oauth: 'yes'
    }
    const User = await user.create({ ...info })
    const token = User.createJwt()
    const email = User.email
    req.user = { userId: User._id, User: User }
    req.email = email
    next()
}
const adminRegister = async (req, res, next) => {
    try {
        const ADMIN = await admin.create({ ...req.body })
        const token = ADMIN.createJwt();
        res.status(StatusCodes.CREATED).json({ Admin: ADMIN, token: token });
    } catch (error) {
        console.log(error);
    }
}
const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('please provide email and password')
    }
    const ADMIN = await admin.findOne({ email })
    if (!ADMIN) {
        throw new UnauthenticatedError('please provide a vailid email')
    }
    const isPaswordCorrect = await ADMIN.comparePassword(password);
    if (!isPaswordCorrect) {
        throw new UnauthenticatedError('incorrect password')
    }
    const token = ADMIN.createJwt()
    res.status(StatusCodes.OK).json({ ADMIN, token: token })
}
module.exports = { register, verifyNewUser, login, googleRegister,
     adminLogin, adminRegister,forgotPassword,verifyToken, resetPassword }