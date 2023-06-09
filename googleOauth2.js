require('dotenv').config()
const passport = require('passport')
const USER = require('./models/user')
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
},
    function (req, accessToken, refreshToken, profile, done) {
        const user = {
            profile: profile,
            accessToken: accessToken,
            refreshToken: refreshToken
        };
        return done(null, user);
    }
))