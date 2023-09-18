const mongoose = require('mongoose');

const post = mongoose.model('post', {
    title: String,
    text: String,
    likes: Number
});

module.exports = post;