const express = require('express');

const PostController = require('../controller/PostController');
const route = express.Router();

route
    .post('/', PostController.register);

module.exports = route;