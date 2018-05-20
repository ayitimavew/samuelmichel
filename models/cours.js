var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var coursSchema = mongoose.Schema({
        image : String,
        titre:String,
        description:String,
        video : [{titre:String, link : String}],
        date: { type: Date, default: Date.now }  
 });

 coursSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Cours', coursSchema);