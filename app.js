const express = require('express');
const logger = require('morgan');

// Generic application setup
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Load routes into variables
const index = require('./routes/index');
const users = require('./services/users/router');
const user_statistics = require('./services/users/router-statistics');

// Routes
app.use('/', index);
app.use('/users', users);
app.use('/statistics', user_statistics);


module.exports = app;
