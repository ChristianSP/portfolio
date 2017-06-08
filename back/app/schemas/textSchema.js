
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({
    value: { type:String,unique:true,required: true},
    ES: { type:String},
    EN: { type:String},
    count: {type:Number, default: "1",required: true},
});