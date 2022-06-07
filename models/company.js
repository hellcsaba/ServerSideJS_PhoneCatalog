var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Company = db.model('Company', {
  name: String,
  site: String
});


module.exports = Company;