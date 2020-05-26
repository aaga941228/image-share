const express = require('express')
const config = require('./config')

const app = express()
require('./database')

app.listen(config.port, () => {
    console.log(`server on port ${config.port}`)
})