const express = require("express");
const router = express.Router();
const candidateProfiles = require("../models/candidateProfile.model");
const candidateResumes = require("../models/candidateResume.model");
const companyJobs = require("../models/companyJob.model");
const companyProfiles = require("../models/companyprofile.model");
const user = require("../models/user");
const { paginateResults } = require("../middlewares/pagination");
const {
  getAllUsers,
  getUser,
  DeleteUser,
  getAllcandidates,
  getAllCompanies,
  getAllResume,
  getAllProfile,
  getAllCompanyProfiles,
  getAllJobPost,
} = require("../controllers/admin");

router.get("/user", paginateResults(user), getAllUsers);
router.route("/user/:id").get(getUser).delete(DeleteUser);
router.get("/candidate", paginateResults(user), getAllcandidates);
router.get("/company", paginateResults(user), getAllCompanies);
router.get(
  "/candidate/resume",
  paginateResults(candidateResumes),
  getAllResume
);
router.get(
  "/candidate/profile",
  paginateResults(candidateProfiles),
  getAllProfile
);
router.get(
  "/company/profile",
  paginateResults(companyProfiles),
  getAllCompanyProfiles
);
router.get("/company/jobpost", paginateResults(companyJobs), getAllJobPost);

module.exports = router;
