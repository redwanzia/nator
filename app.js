const http = require('http');
const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// body parser middleware:
app.use(express.json());

// serving static files
app.use(express.static(`${__dirname}/public`));

// routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
