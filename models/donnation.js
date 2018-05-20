var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var donnationSchema = mongoose.Schema({
        nom: String,
        prenom: String,
        phone: String,
        description: String,
        date: { type: Date, default: Date.now }        
 });

 donnationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Donnation', donnationSchema);