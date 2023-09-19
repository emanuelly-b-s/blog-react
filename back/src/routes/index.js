const bodyParser = require('body-parser');
const post = require('./post');
const user = require('./user');
const author = require('./author');

module.exports = (app) => {
    app.use(
        bodyParser.json(),
        post,
        author,
        user
    );
}