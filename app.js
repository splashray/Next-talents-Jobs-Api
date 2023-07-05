require('dotenv').config()
require('./utils/googleOauth2')
const connectDB = require('./db/connect')
const { auth, checkAdmin } = require('./middlewares/authentication')

// for google login or register
const passport = require('passport')

const authRouter = require('./routes/auth')
const adminRouter = require('./routes/admin');
<<<<<<< HEAD
const profileRoutes = require("./routes/candidates/profile");
const companyProfileRoutes = require('./routes/company/profile')
const resumeRoutes = require('./routes/candidates/resume');
=======
const candidateRouter = require("./routes/candidate.router");
const companyRouter = require("./routes/company.router");
>>>>>>> 19c6fe279dbee07ce9a92558b2c1c240b271b31f
const asyncErrors = require('express-async-errors')
const {errorHandlerMiddleware} = require('./middlewares/error-handler')

const express = require('express');
const app = express()
const session = require('express-session')

// middlewares
app.use(errorHandlerMiddleware);
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// routers

// general auth router

app.get('/api/v1', (req, res) => {
  res.send('job listing api is now live ...');
})
app.use('/api/v1/auth', authRouter);
app.use('/google', authRouter);

// general router

app.get('/api/v1/candidate',candidateRouter);



// candidate router

app.use('/api/v1/candidate', auth, candidateRouter);
app.use("/api/v1/employers",auth, companyRouter);

// company router 

app.use('/api/v1/dashboard/companyProfile',companyProfileRoutes);

// admin router
app.use('/api/v1/admin/dashboard', checkAdmin, adminRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGOURI);
    app.listen(3000, () => console.log(`app is listening on port 3000...`));
  } catch (error) {
    console.log(error);
  }
};
start();
