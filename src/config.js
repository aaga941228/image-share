require('dotenv').config()

module.exports = {
    port: process.env.PORT || 3001,
    uri: process.env.URI,
}