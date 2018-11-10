var mongoose = require('mongoose');

var RestaurantSchema = mongoose.Schema({
    username: String,
    name: String,
    location: String,
    address: String,
    maxPeople: Number,
    category: String,
    price: String, 
    image: String
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);