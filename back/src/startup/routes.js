const express = require('express');
const blog = require('../routes/blog')

module.exports = function (app) {
    app.use(express.json())
    .use('/blog', blog);
}