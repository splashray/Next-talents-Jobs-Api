const express = require('express');
const router = express.Router();
const {getUser,getAllCompanies,getAllcandidates} = require('../controllers/admin')

router.get('/candidates',getAllcandidates)
router.get('/employers',getAllCompanies)
router.get('/user/:id',getUser)

module.exports = router;