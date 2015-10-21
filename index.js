var Locaez = require('./src/locale.js'),
    locaez = new Locaez();

exports = module.exports = function(options) {
  var locaez = new Locaez(options);
  return locaez.parse.bind(locaez);
};
