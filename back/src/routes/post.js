const express = require('express');

const PostController = require('../controller/PostController');
const route = express.Router();

route
    .post('/', PostController.register)
    .get('/', PostController.getAll)
    .post('/like/:id', PostController.likePost)
    .delete('/like/:id', PostController.dislikePost);

module.exports = route;