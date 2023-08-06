const express = require("express");
const router = express.Router();
const candidateProfiles = require("../models/candidateProfile.model");
const Resume = require("../models/candidateResume.model");
const companyJobs = require("../models/companyJob.model");
const companyProfiles = require("../models/companyprofile.model");
const user = require("../models/user");
const { StatusCodes } = require("http-status-codes");

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
router.get("/candidate", getAllcandidates);
router.get("/company", getAllCompanies);
router.get("/candidate/resume", paginateResults(Resume), getAllResume);
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

function paginateResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const options = {
      page,
      limit,
    };

    try {
      const { docs, totalDocs, hasNextPage, hasPrevPage, nextPage, prevPage } =
        await model.paginate({}, options);
      res.paginatedResults = {
        totalDocs,
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage,
        results: docs,
      };
      next();
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
    }
  };
}

module.exports = router;
