var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var baSchema = mongoose.Schema({
        id_user : String,
        nom:String,
        prenom:String,
        
 });

 baSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Becomeadmin', baSchema);