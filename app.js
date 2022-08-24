const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const dotenv = require('dotenv');
const connect = require('./config/db')

// Import env variables
dotenv.config({path: './config/config.env'});

// Import all routes
const jobs = require('./routes/jobs')

// Connect to DB
connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1',jobs);

app.listen(process.env.PORT, (
    console.log(`Server started on port ${process.env.PORT}`)
));