const express = require('express');
const router = express.Router();
const {candidateList,jobList,getUser,companyList} = require('../controllers/home.controller')

router.get('/candidate',candidateList)
router.get('/job',jobList)
router.get('/company',companyList)
router.get('/user/:id',getUser)

module.exports = router;