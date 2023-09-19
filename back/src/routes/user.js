const express = require('express');

const AuthControler = require('../controller/AuthController');
const route = express.Router();

route
    .post('/register', AuthController.register);

module.exports = route; 