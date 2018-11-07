var MongoClient = require('mongodb').MongoClient;
var conversionsXML = "";
var assert = require('assert');
var nodemailer = require('nodemailer');
var express = require("express");
var app = express();
var geocoder = require('geocoder');

var User = require('./usermodel');
var Restaurant = require('./restaurantmodel');
var Reservation = require('./reservationmodel');
var AppRate = require('./qReservationOpinionmodel');
var RestaurantRate = require('./restaurantOpinionmodel');
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "qreservation0@gmail.com",
        pass: "adminReservation19"
    }
});

exports.rateApp = (req, res) => {

      // Validate request
    if(req.body.title == "" && req.body.comment == "") {
        return res.status(400).send({
            message: "Error, info content can not be empty"
        });
    }

    // Create a Note
    const appOpinion = new AppRate({
        username: req.body.a, 
        title: req.body.title, 
        comment: req.body.comment, 
        rating: req.body.rating, 
        image: req.body.image
    });

    // Save Note in the database
    appOpinion.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};


exports.rateRestaurant = (req, res) => {
    
      if(req.body.title == "" && req.body.comment == "") {
        return res.status(400).send({
            message: "Error, info content can not be empty"
        });
    }
    
    console.log(req.body.restaurant);
console.log(req.body.image);
    // Create a Note
    const restaurantRate = new RestaurantRate({
        username: req.body.a, 
        restaurantId: req.body.restaurantId,
        restaurant: req.body.restaurant,
        title: req.body.title, 
        comment: req.body.comment, 
        rating: req.body.rating, 
        image: req.body.image
    });
    
    // Save Note in the database
    restaurantRate.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};



exports.getAppOpinion = (req, res) => {

    AppRate.find()
    .then(rate => {
        console.log(rate);
        res.send(rate);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


exports.getAdminRestaurantOpinions = (req, res) => {
    var restaurantId = req.body.restaurantId;
    console.log(restaurantId);
    RestaurantRate.find({"restaurantId":  restaurantId})
    .then(rate => {
        res.send(rate);
        console.log(rate);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};
