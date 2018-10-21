var mongoose = require('mongoose');

var ReservationSchema = mongoose.Schema({
    username: String,
    restaurant: String,
    restaurantName: String,
    date: String,
    time: String, 
    people: String, 
    name: String,
    phone: Number, 
    mail: String, 
    image: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Reservation', ReservationSchema);