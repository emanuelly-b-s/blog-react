const express = require('express');
const user = require('../routes/user')
const post = require('../routes/post')
const author = require('../routes/author')


module.exports = function (app) {
    app.use(express.json())
    .use('/user', user)
    .use('/author', author)
    .use('/post', post);
}