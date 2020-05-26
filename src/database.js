const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('db is connected'))
    .catch(err => console.error(err))