const express = require('express');
const AuthController = require('../controller/AuthController');
const router = express.Router();

router
    .post('/', AuthController.register)
    .post('/auth/login', AuthController.login)
    .post('/post/new-post');
// .delete('/delete', AuthController.delete);

module.exports = router;