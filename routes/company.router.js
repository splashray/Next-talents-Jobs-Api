const express = require("express");
const router = express.Router();
const jobPostcontroller = require("../controllers/companyJob.controller");

const profileController = require("../controllers/companyProfile.controller");
//company job route
router.post("/", jobPostcontroller.createJobsPost);;
router.get("/",jobPostcontroller.getAllJobPost);
router.get("/:id", jobPostcontroller.getJobPostByID);
router.patch("/:id", jobPostcontroller.updateJobPostByID);
router.delete("/:id", jobPostcontroller.deleteJobPostByID);

//company profile route

router.patch("/", profileController.updateProfile);

module.exports = router;
