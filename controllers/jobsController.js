const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { findByIdAndDelete } = require('../models/jobs');
const Job = require('../models/jobs');
const APIFilters = require('../utils/apiFilters');
const ErrorHandler = require('../utils/errorHandler');

// Get all jobs => /api/v1/jobs
exports.getJobs = catchAsyncErrors ( async (req, res, next) => {

    const apiFilters = new APIFilters(Job.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .searchByQuery()
        .pagination();

    const jobs = await apiFilters.query;

    res.status(200).json({
        success: true,
        results: jobs.length,
        data: jobs
    });
})

// Get job with id and slug => /api/v1/:id/:slug

exports.getJob = catchAsyncErrors ( async (req, res, next) => {

    const job = await Job.find({ $and: [{ _id: req.params.id }, { slug: req.params.slug }] });

    if(!job || job.length === 0){
        return next(new ErrorHandler('Job not found', 404));
    }

    res.status(200).json({
        success: true,
        data: job
    });
})

// Create a new job => /api/v1/jobs
exports.newJob = catchAsyncErrors( async (req, res, next) => {

    // Adding user to body
    req.body.user = req.user.id;

    const job = await Job.create(req.body);
    res.status(200).json({
        success: true,
        message: 'Job Created Successfully.',
        data: job
    });
});

// Update a Job => /api/v1/jobs/:id
exports.updateJob = catchAsyncErrors ( async (req, res, next) => {
    
    let job = await Job.findById(req.params.id);

    if(!job){
        return next(new ErrorHandler('Job not found', 404));
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
})

// Delete a Job => /api/v1/jobs/:id
exports.deleteJob = catchAsyncErrors ( async (req, res, next) => {

    let job = await Job.findById(req.params.id);

    if(!job){
        return next(new ErrorHandler('Job not found', 404));
    }

    job = await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Job is deleted.',
    });

})