const mongoose = require('mongoose');

const user_login = mongoose.model('user_login', {
    name: String,
    email: String,
    password: String
});

module.exports = user_login;