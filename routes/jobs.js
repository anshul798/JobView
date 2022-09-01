const express = require('express');
const { getJobs, newJob, updateJob, deleteJob, getJob, applyJob } = require('../controllers/jobsController');
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.get('/jobs', getJobs);

router.get('/jobs/:id/:slug', getJob);

router.post('/jobs', isAuthenticatedUser, authorizeRoles('employeer', 'admin'), newJob);

router.put('/jobs/:id', isAuthenticatedUser, authorizeRoles('employeer', 'admin'), updateJob);

router.delete('/jobs/:id', isAuthenticatedUser, authorizeRoles('employeer', 'admin'), deleteJob);

router.put('/jobs/:id/apply', isAuthenticatedUser, authorizeRoles('user'), applyJob)

module.exports = router;