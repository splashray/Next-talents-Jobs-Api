const user = require('../models/user')
const userOtp = require('../models/userOtp.verification')
const jwt = require('jsonwebtoken')
const admin = require('../models/admin')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors')
const candidateProfile = require("../models/candidateProfile.model");
const companyProfile = require("../models/companyprofile.model");
const { sendVerificationEmail, resendOtpVerificationCode } = require('../utils/email');
const bcrypt = require('bcryptjs');

const register = async (req, res, next) => {
    try {
        const USER = await user.create({ ...req.body })
        const token = USER.createJwt();
        const link = `${process.env.SITEURL}/auth/register/${token}`
        await sendVerificationEmail({ _id: USER._id, email: USER.email }, link, res);
        const email = USER.email
        req.user = { userId: USER._id, User: USER, role: USER.role }
        req.email = email
        next()
    } catch (error) {
        next(error);
    }
}
const createProfile = async (req, res) => {
    const role = req.user.role
    if (role === "company") {

        req.body.user = req.user.userId;
        req.body.email = req.email;
        const userData = req.user.User;
        const newProfile = await companyProfile.create(req.body);
    }
    req.body.user = req.user.userId;
    req.body.email = req.email;
    const userData = req.user.User;
    const newProfile = await candidateProfile.create(req.body);
}
const verifyNewUser = async (req, res, next) => {
    try {
        const token = req.params.token;
        const payload = jwt.verify(token, process.env.JWTSECRET)
        const User = { userId: payload.userId, email: payload.email }
        console.log(User);
        if (!User) {
            return new UnauthenticatedError("user not found")
        }
        console.log(User);
        console.log(User.email);
        email = User.email;
        console.log(email);
        const foundUser = await user.findOne({ email });
        console.log(foundUser);
        await user.findOneAndUpdate({ email }, { isVerified: true }, { new: true, runValidators: true })
        const newToken = await foundUser.createJwt();
        res.status(StatusCodes.OK).json({ message: "user is now verified", token: newToken });
    } catch (error) {
        next(error);
    }
}
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new BadRequestError('please provide email and password')
        }
        const USER = await user.findOne({ email })
        if (!USER) {
            throw new UnauthenticatedError('please provide a vailid email')
        }
        const isVerified = USER.isVerified;
        if (!isVerified) {
            throw new UnauthenticatedError('user is not verified kindly check your mail to verify')
        }
        const isPaswordCorrect = await USER.comparePassword(password);
        if (!isPaswordCorrect) {
            throw new UnauthenticatedError('incorrect password')
        }
        const token = USER.createJwt()
        res.status(StatusCodes.OK).json({ USER, token: token })
    } catch (error) {
        next(error)
    }

}
const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            throw new BadRequestError('please provide email')
        }
        const foundUser = await user.findOne({ email: email });
        if (!foundUser) {
            throw new NotFoundError("User not found");
        } else {
            const token = await foundUser.createJwt();
            const link = `${process.env.SITEURL}/auth/verifytoken/${token}`
            await sendVerificationEmail({ _id: foundUser._id, email }, link, res);
        }
    } catch (error) {
        next(error);
    }
};
const verifyToken = async (req, res, next) => {
    try {
        const token = req.params.token;
        const payload = jwt.verify(token, process.env.JWTSECRET)
        const User = { userId: payload._id, email: payload.email }
        if (!User) {
            throw new UnauthenticatedError("user not found")
        }
        const email = User.email
        const foundUser = await user.findOne({ email: email })
        const newToken = await foundUser.createJwt();
        res.status(StatusCodes.OK).json({ message: "verified user", token: newToken });
    } catch (error) {
        next(error);
    }
}
const resetPassword = async (req, res, next) => {
    try {
        const { password, confirmPassword } = req.body;
        const email = req.email
        if (!password || !confirmPassword) {
            throw new BadRequestError("please enter password and confirm to proceed")
        }
        if (password != confirmPassword) {
            throw new BadRequestError("both passsword doesn't not match please check and try again")
        }
        const newPassword = await user.findOneAndUpdate({ email: email }, { password },
            { new: true, runValidators: true });
        res.status(200).json({
            status: `successful`,
            message: `password successfully changed`
        })
    } catch (error) {
        next(error);
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
        next(error);
    }
}
const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return new BadRequestError('please provide email and password')
        }
        const ADMIN = await admin.findOne({ email })
        if (!ADMIN) {
            return new UnauthenticatedError('please provide a vailid email')
        }
        const isPaswordCorrect = await ADMIN.comparePassword(password);
        if (!isPaswordCorrect) {
            return new UnauthenticatedError('incorrect password')
        }
        const token = ADMIN.createJwt()
        res.status(StatusCodes.OK).json({ ADMIN, token: token })
    } catch (error) {
        next(error);
    }
}
module.exports = {
    register, createProfile, verifyNewUser, login,
    googleRegister, adminLogin, adminRegister,
    forgotPassword, verifyToken, resetPassword
}