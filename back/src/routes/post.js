const express = require('express');

const PostController = require('../controller/PostController');
const route = express.Router();

route
    .post('/post/', PostController.create);
    
module.exports = route;