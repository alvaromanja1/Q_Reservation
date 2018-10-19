var mongoose = require('mongoose');

var RestaurantSchema = mongoose.Schema({
    username: String,
    name: String,
    location: String,
    maxPeople: Number,
    category: String,
    price: String
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);