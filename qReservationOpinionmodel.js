var mongoose = require('mongoose');

var AppRateSchema = mongoose.Schema({
    username: String,
    title: String,
    comment: String,
    rating: Number, 
    image: String
}, {
    timestamps: true
});

module.exports = mongoose.model('AppRate', AppRateSchema);