const { Router } = require('express')
const router = Router()

const { home } = require('../controllers/home.controllers')
const { index, create, like, comment, remove } = require('../controllers/image.controllers')

router
    .get('/', home)
    .get('/images/:image_id', index)
    .post('/images', create)
    .post('/images/:image_id/like', like)
    .post('/images/:image_id/comment', comment)
    .delete('/images/:image_id/remove', remove)

module.exports = router