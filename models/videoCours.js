var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var videoSchema = mongoose.Schema({
        idVideo : String,
        titre:String,
        lien:String,
        date: { type: Date, default: Date.now }  
 });

 videoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('videos', videoSchema);