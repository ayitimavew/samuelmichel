const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
var userSchema = mongoose.Schema({
    // Using local for Local Strategy Passport
    nom: String,
    prenom: String,
    email: String,
    password: String,
    photo : {type: String, default: 'default.png'},
    bio : {type: String, default: 'Mete yon biografi.'},
    premium: {type: String, default: 'no'},
    admin : {type: Boolean, default: false},
    cours: [{id:String}]   
});
// Encrypt Password
userSchema.methods.generateHash = function(password) {
return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// Verify if password is valid
userSchema.methods.validPassword = function(password) {
return bcrypt.compareSync(password, this.password);
};
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);