const helpers = {}

helpers.randomString = function() {
    const characters = 'abcdefghijklmnopqrstuvwxyz1234567890'
    let string = ''
    for(let i = 0; i < characters.length; i++) {
        string += Math.floor(Math.random() * characters.length)
    }
    return string
}

module.exports = helpers