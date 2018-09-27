var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var objectId = require('mongodb').ObjectID;
var urlResponseHandlers = require("./urlResponseHandler");
var controller = require("./controller");
var dbConfig = require('./database.config');
var mongoose = require('mongoose');

module.exports = (app) => {
    const user = require('./urlResponseHandler');
    const restaurant = require('./urlResponseHandler');

    // Create a new Note
    app.post('/user', user.create);
    
    app.post('/restaurant', restaurant.createRestaurant);

    // Retrieve all Notes
    app.get('/users', user.findAll);

    // Retrieve a single Note with noteId
    app.get('/users/:username', user.findOne);

    // Update a Note with noteId
    app.put('/users/:username', user.update);

    // Delete a Note with noteId
    app.delete('/users/:username', user.delete);
}