const bodyParser = require('body-parser')
const auth = require('./auth')

module.exports = (app) => {
    app.use (
        bodyParser.json(),
        auth
    )
}