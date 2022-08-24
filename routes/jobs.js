const express = require('express');
const { getJobs, newJob } = require('../controllers/jobsController');
const router = express.Router();

router.get('/jobs', getJobs);

router.post('/job/new', newJob);

module.exports = router;