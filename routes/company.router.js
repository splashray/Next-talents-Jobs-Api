const express = require("express");
const router = express.Router();
const jobPostcontroller = require("../controllers/companyJob.controller");

router.post("/job", jobPostcontroller.createJobsPost);;
router.get("/job",jobPostcontroller.getAllJobPost);
router.get("/job/:id", jobPostcontroller.getJobPostByID);
router.patch("/job/:id", jobPostcontroller.updateJobPostByID);
router.delete("/job/:id", jobPostcontroller.deleteJobPostByID);
module.exports = router;
