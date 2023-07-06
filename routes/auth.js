const express = require('express')
const router = express.Router()
const passport = require('passport')

const {adminLogin, adminRegister} = require('../controllers/auth');
const {auth} = require('../middlewares/authentication')
const {register, verifyNewUser,login,googleRegister,
    forgotPassword,verifyToken,resetPassword} = require('../controllers/auth')
const {createProfileCompany} = require("../controllers/companyProfile.controller")
const {createProfile} = require('../controllers/candidateProfile.controller')

// candidate auth route

router.post('/register',[register,createProfile])
router.patch('/register/:token',verifyNewUser);
router.post('/login',login)
router.post('/forgotpassword',forgotPassword);
router.get('/verifytoken/:token',verifyToken)
router.patch('/resetpassword',auth,resetPassword);

// google login router

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/callback', passport.authenticate('google',
    { failureRedirect: '/failed' }),[googleRegister,createProfile]
);

// admin auth route
router.post('/admin/register',adminRegister);
router.post('/admin/login',adminLogin);

module.exports = router