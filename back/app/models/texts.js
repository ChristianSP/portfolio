// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var textSchema = require('../schemas/textSchema')
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Text',textSchema);
