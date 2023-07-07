const express = require("express");
const router = express.Router();


const upload = require('../utils/multer')
const jobPostcontroller = require("../controllers/companyJob.controller");
const profileController = require("../controllers/companyProfile.controller");


//company profile route

router.patch("/profile", upload.single('profile-pics'),
[profileController.uploadProfilePics,profileController.updateProfile]);

//company job route

router.post("/job", jobPostcontroller.createJobsPost);;
router.get("/job",jobPostcontroller.getAllJobPost);
router.get("/job/:id", jobPostcontroller.getJobPostByID);
router.patch("/job/:id", jobPostcontroller.updateJobPostByID);
router.delete("/job/:id", jobPostcontroller.deleteJobPostByID);

module.exports = router;
