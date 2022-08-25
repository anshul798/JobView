const { findByIdAndDelete } = require('../models/jobs');
const Job = require('../models/jobs');

// Get all jobs => /api/v1/jobs
exports.getJobs = async (req, res) => {
    const jobs = await Job.find();

    res.status(200).json({
        success: true,
        results: jobs.length,
        data: jobs
    });
};

// Get job with id and slug => /api/v1/:id/:slug

exports.getJob = async (req, res) => {

    const job = await Job.find({ $and: [{ _id: req.params.id }, { slug: req.params.slug }] });

    if(!job || job.length === 0){
        return res.status(404).json({
            success: false,
            message: 'Job not found.'
        });
    }

    res.status(200).json({
        success: true,
        data: job
    });
}

// Create a new job => /api/v1/jobs
exports.newJob = async (req, res) => {
    const job = await Job.create(req.body);
    res.status(200).json({
        success: true,
        message: 'Job Created Successfully.',
        data: job
    });
}

// Update a Job => /api/v1/jobs/:id
exports.updateJob = async (req, res) => {
    
    let job = await Job.findById(req.params.id);

    if(!job){
        return res.status(404).json({
            success: false,
            message: 'Job not found.'
        });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        message: 'Job is updated.',
        data: job
    });
}

// Delete a Job => /api/v1/jobs/:id
exports.deleteJob = async (req, res) => {

    let job = await Job.findById(req.params.id);

    if(!job){
        return res.status(404).json({
            success: false,
            message: 'Job not found.'
        });
    }

    job = await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Job is deleted.',
    });

}