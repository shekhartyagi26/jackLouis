var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jacklouisSchema = new Schema({
    name: { type: String },
    message: { type: String },
    email: { type: String }
});

module.exports = mongoose.model('jacklouis', jacklouisSchema)