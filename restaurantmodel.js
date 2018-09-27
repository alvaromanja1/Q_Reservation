var mongoose = require('mongoose');

var RestaurantSchema = mongoose.Schema({
    name: String,
    location: String,
    maxPeople: Number,
    category: String,
    price: String
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);