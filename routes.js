var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var objectId = require('mongodb').ObjectID;
var urlResponseHandlers = require("./urlResponseHandler");
var controller = require("./controller");
var dbConfig = require('./database.config');
var mongoose = require('mongoose');
bodyParser = {
  json: {limit: '500mb', extended: true},
  urlencoded: {limit: '500mb', extended: true}
};
module.exports = (app) => {
    const user = require('./urlResponseHandler');
    const restaurant = require('./urlResponseHandler');
    const reservation = require('./urlResponseHandler');
    const appOpinion = require('./urlResponseHandler');
    const restaurantOpinion = require('./urlResponseHandler');

    // Create a new Note
    app.post('/user', user.create);
    
    app.post('/login', user.login);
    
    app.post('/restaurant', restaurant.createRestaurant);
    
    app.get('/restaurants', restaurant.getRestaurants);
    
    app.post('/reservation', reservation.createReservation);
    
    app.post('/getReservations', reservation.getReservations);
    
    app.post('/getReservationInfo', reservation.getReservationInfo);
    
    app.post('/deleteReservation', reservation.deleteReservation);
    
    app.post('/modifyReservation', reservation.modifyReservation);
    
    app.post('/rateApp', appOpinion.rateApp);
    
    app.post('/rateRestaurant', restaurantOpinion.rateRestaurant);
    
    app.get('/getNewestRestaurants', restaurant.getNewestRestaurants);
    
    app.get('/getAppOpinion', appOpinion.getAppOpinion);
    
    app.get('/getRestaurantName', restaurant.getRestaurantName);
    
    app.post('/updatePass', user.updatePass);
    
    app.post('/getUserRestaurants', restaurant.getUserRestaurants);
    
    app.post('/getAdminRestaurantList', restaurant.getAdminRestaurantList);
    
    app.post('/getAdminRestaurantOpinions', restaurantOpinion.getAdminRestaurantOpinions);
    
    app.post('/getUserInfo', user.getUserInfo);
    
    app.post('/getRestaurantImage', restaurant.getRestaurantImage);
    
    app.get('/getTweets', user.getTweets);

    // Retrieve all Notes
    app.get('/users', user.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/:username', user.findOne);

    // Update a Note with noteId
    app.put('/users/:username', user.update);

    // Delete a Note with noteId
    app.delete('/users/:username', user.delete);
}