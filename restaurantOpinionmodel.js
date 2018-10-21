var mongoose = require('mongoose');

var RestaurantRateSchema = mongoose.Schema({
    username: String,
    restaurantId: String,
    restaurant: String,
    title: String,
    comment: String,
    rating: Number, 
    image: String
}, {
    timestamps: true
});

module.exports = mongoose.model('RestaurantRate', RestaurantRateSchema);