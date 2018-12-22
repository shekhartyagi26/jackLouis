var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: Array, default: [] }
});

module.exports = mongoose.model('product', productSchema);