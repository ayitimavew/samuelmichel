var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var emissionSchema = mongoose.Schema({
        titre : String,
        link: String,
        date: { type: Date, default: Date.now }        
 });

 emissionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Emission', emissionSchema);