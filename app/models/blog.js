var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  name: { type: String },
  message: { type: String },

});
module.exports = mongoose.model('blogs', blogSchema);