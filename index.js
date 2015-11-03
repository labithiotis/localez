var Locaez = require(__dirname + '/src/locale.js'),
    locaez = new Locaez();

exports = module.exports = locaez.parse.bind(locaez)

exports.lang = locaez.lang
exports.locales = locaez.locales
exports.load = locaez.load.bind(locaez)
exports.set = locaez.set.bind(locaez)
