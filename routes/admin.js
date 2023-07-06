const  {
    getAllUsers,
    getUser,
    DeleteUser,
    getAllcandidates,
    getAllCompanies,
    getAllResume,
    getAllProfile
} = require('../controllers/admin');



const express = require('express');
const router = express.Router();


router.get('/users',getAllUsers);
router.route('/users/:id').get(getUser).delete(DeleteUser);
router.get('/candidates',getAllcandidates);
router.get('/companies',getAllCompanies);
router.get('/resumes',getAllResume);
router.get('/profiles',getAllProfile);


module.exports = router;