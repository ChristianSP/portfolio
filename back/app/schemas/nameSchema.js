
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
    firstname: { type:String,required: true},
    lastname: { type:String,required: true},
});