const express = require('express');
const { getJobs, newJob, updateJob, deleteJob, getJob } = require('../controllers/jobsController');
const router = express.Router();

router.get('/jobs', getJobs);

router.get('/jobs/:id/:slug', getJob);

router.post('/jobs', newJob);

router.put('/jobs/:id', updateJob);

router.delete('/jobs/:id', deleteJob);

module.exports = router;