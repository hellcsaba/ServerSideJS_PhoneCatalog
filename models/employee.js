var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Employee = db.model('Employee', {
  name: String,
  telephone: String,
  telephoneNumber: String,
  _company: {
      type: Schema.Types.ObjectId,
      ref: 'Company'
  }
});

module.exports = Employee;