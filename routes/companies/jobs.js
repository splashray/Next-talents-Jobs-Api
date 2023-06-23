const express = require("express");
const router = express.Router();
const jobPostcontroller = require("../../controllers/companies/jobs");

router.post("/", jobPostcontroller.createJobsPost);;
router.get("/user/:userId/jobPosts", jobPostcontroller.getAllJobPost);
router.get("/:id", jobPostcontroller.getJobPostByID);
router.patch("/:id", jobPostcontroller.updateJobPostByID);
router.delete("/:id", jobPostcontroller.deleteJobPostByID);
module.exports = router;
