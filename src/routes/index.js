const express = require('express');
const users =  require('./user.routes.js');
const routes = express.Router();

routes.use('/users', users);

module.exports = routes;