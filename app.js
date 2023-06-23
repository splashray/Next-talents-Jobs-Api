require("dotenv").config();
require("./googleOauth2");
const connectDB = require("./db/connect");
const authenticateUser = require("./middlewares/authentication");

// for google login or register
const passport = require("passport");

const authRouter = require("./routes/auth");
const profileRoutes = require("./routes/candidates/profile");
const resumeRoutes = require("./routes/candidates/resume");
const postJobsRoutes = require("./routes/companies/jobs");
const asyncErrors = require("express-async-errors");
const errorHandlerMiddleware = require("./middlewares/error-handler");

const express = require("express");
const app = express();
const session = require("express-session");

// middlewares
app.use(errorHandlerMiddleware);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// routers
app.get("/api/v1", (req, res) => {
  res.send("job listing api is now live ...");
});
app.use("/api/v1/auth", authRouter);
app.use("/google", authRouter);
app.use("/api/v1/dashboard/resumes", authenticateUser, resumeRoutes);
app.use("/api/v1/dashboard/profile", authenticateUser, profileRoutes);
app.use("/api/v1/employers-dashboard/post-jobs", postJobsRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGOURI);
    app.listen(3000, () => console.log(`app is listening on port 3000...`));
  } catch (error) {
    console.log(error);
  }
};
start();
