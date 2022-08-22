const express = require('express');
const app = express();
const dotenv = require('dotenv');

// Import env variables
dotenv.config({path: './config/config.env'});

// Import all routes
const jobs = require('./routes/jobs')

app.use(jobs);


app.listen(process.env.PORT, (
    console.log(`Server started on port ${process.env.PORT}`)
));