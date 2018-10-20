var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String, 
    hasRestaurant: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);