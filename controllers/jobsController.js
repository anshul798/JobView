const Job = require('../models/jobs');

// Get all jobs => /api/v1/jobs
exports.getJobs = (req, res) => {
    res.send("works");
};

// Create a new job => /api/v1/job/new
exports.newJob = async (req, res) => {
    const job = await Job.create(req.body);
    res.status(200).json({
        success: true,
        message: 'Job Created Successfully.',
        data: job
    });
}