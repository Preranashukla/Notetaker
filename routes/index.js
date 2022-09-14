const express = require('express');

// Import our modular router
const apiRouter = require('./apiRoutes');

const app = express();

app.use('/notes', apiRouter);

module.exports = app;