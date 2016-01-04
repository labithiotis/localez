//require('babel-register');

var localez = require('./src/localez.js');

exports = module.exports = localez.parse.bind(localez)

exports.lang = localez.lang
exports.locales = localez.locales
exports.load = localez.load.bind(localez)
exports.set = localez.set.bind(localez)
