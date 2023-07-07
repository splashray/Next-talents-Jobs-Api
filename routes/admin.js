const  {
    getAllUsers,
    getUser,
    DeleteUser,
    getAllcandidates,
    getAllCompanies,
    getAllResume,
    getAllProfile,
    getAllCompanyProfiles,
    getAllJobPost
} = require('../controllers/admin');



const express = require('express');
const router = express.Router();


router.get('/user',getAllUsers);
router.route('/user/:id').get(getUser).delete(DeleteUser);
router.get('/candidate',getAllcandidates);
router.get('/company',getAllCompanies);
router.get('/candidate/resume',getAllResume);
router.get('/candidate/profile',getAllProfile);
router.get('/company/profile',getAllCompanyProfiles);
router.get('/company/jobpost',getAllJobPost);


module.exports = router;