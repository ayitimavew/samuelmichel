var mongoose = require('mongoose');

var categorieSchema = mongoose.Schema({
        titre: String       
 });

module.exports = mongoose.model('Categorie', categorieSchema);