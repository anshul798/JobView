const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connect = require('./config/db');
const errorMiddleware = require('./middlewares/errors');

// Import env variables
dotenv.config({path: './config/config.env'});

// Handling Uncaught Exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down due to uncaught exception.')
    process.exit(1);
});

// Import all routes
const jobs = require('./routes/jobs');
const auth = require('./routes/auth')
const ErrorHandler = require('./utils/errorHandler');

// Connect to DB
connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set cookie parser
app.use(cookieParser());

app.use('/api/v1',jobs);
app.use('/api/v1', auth)

// Handle unhandled routes
app.all('*', (req, res, next) => {
    next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
});

// Middleware to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT;
const server = app.listen(PORT, ()=> {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handling Unhandled Promise Rejection
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to Unhandled promise rejection.')
    server.close( () => {
        process.exit(1);
    }) 
});