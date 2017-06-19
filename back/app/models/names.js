// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var nameSchema = require('../schemas/nameSchema')
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Name',nameSchema);
