const express = require('express');
const logger = require('morgan');

// Generic application setup
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Load routes into variables
const index = require('./routes/index');
const users = require('./user_service/router');
const trips = require('./trip_service/router');

// Routes
app.use('/', index);
app.use('/users', users);
app.use('/trips', trips);

module.exports = app;
