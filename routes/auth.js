const express = require('express')
const router = express.Router()
const passport = require('passport')

const {adminLogin, adminRegister} = require('../controllers/auth');
const {register,login,googleRegister} = require('../controllers/auth')
const {createProfile,updateProfile} = require('../controllers/candidates/profile')

// candidate auth route

router.post('/register',[register,createProfile])
router.post('/login',login)

// google login router

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/callback', passport.authenticate('google',
    { failureRedirect: '/failed' }),[googleRegister,createProfile]
);

// admin auth route
router.post('/admin/register',adminRegister);
router.post('/admin/login',adminLogin);

module.exports = router