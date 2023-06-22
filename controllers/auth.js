const user = require('../models/user')
const admin = require('../models/admin')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res,next) => {
    try {
        const USER = await user.create({ ...req.body })
        const token = USER.createJwt();
        const email = USER.email
        req.user = { userId: USER._id, User: USER }
        req.email = email
        req.token = token
        next()
    } catch (error) {
        console.log(error);
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
    const isPaswordCorrect = await USER.comparePassword(password);
    if (!isPaswordCorrect) {
        throw new UnauthenticatedError('incorrect password')
    }
    const token = USER.createJwt()
    res.status(StatusCodes.OK).json({ USER, token: token })
}
const googleRegister = async (req, res,next) => {
    console.log(req.user.profile);
    const profile = req.user.profile
    const info = {
        name: profile.given_name,
        email: profile.email,
        password: profile.family_name,
        oauth: 'yes'
    }
    const User = await user.create({...info})
    const token = User.createJwt()
    const email = User.email
    req.user = { userId: User._id, User: User }
    req.email = email
    next()
}

const adminRegister = async (req, res,next) => {
    try {
        const ADMIN = await admin.create({ ...req.body })
        const token = ADMIN.createJwt();
        res.status(StatusCodes.CREATED).json({Admin: ADMIN,token:token});
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


module.exports = {register,login,googleRegister,adminLogin,adminRegister}