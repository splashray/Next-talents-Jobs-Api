const express = require('express')
const router = express.Router()
const passport = require('passport')

const {register,login,googleRegister} = require('../controllers/auth')
const {createProfile,updateProfile} = require('../controllers/candidates/profile')


router.post('/register',[register,createProfile])
router.post('/login',login)

// google login router

router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/callback', passport.authenticate('google',
    { failureRedirect: '/failed' }),[googleRegister,createProfile]
);

module.exports = router