const express = require('express');

const PostController = require('../controller/PostController');
const route = express.Router();

route
    .post('/', PostController.register)
    .get('/', PostController.getAll)
    .post('/like/:id', PostController.likePost)
    .post('/deslike/:id', PostController.deslikePost);
    

module.exports = route;