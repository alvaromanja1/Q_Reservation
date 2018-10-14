var mongoose = require('mongoose');

var RestaurantRateSchema = mongoose.Schema({
    username: String,
    restaurant: String,
    title: String,
    comment: String,
    rating: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('RestaurantRate', RestaurantRateSchema);