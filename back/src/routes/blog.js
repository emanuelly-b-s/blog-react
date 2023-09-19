const express = require('express');
const PostController = require('../controller/PostController');
const AuthController = require('../controller/UserController');
const route = express.Router();

route
    .post('/', AuthController.register)
    // .post('/auth/login', AuthController.login)
    // .post('/post/new-post', PostController.newPost);
// .delete('/delete', AuthController.delete);

module.exports = route;