var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var annonceSchema = mongoose.Schema({
        idAuteur: String,
        image: String,
        description: String,
        date: { type: Date, default: Date.now }        
 });

 annonceSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Annonce', annonceSchema);