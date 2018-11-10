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
// Create and Save a new Note

//Insertar restaurante
exports.createRestaurant = (req, res) => {
    // Validate request
    if(req.body.name == "" && req.body.location == "" && req.body.address == "" && req.body.maxpeople == "" && req.body.category == "" && req.body.price == "") {
        return res.status(400).send({
            message: "Restaurant info content can not be empty"
        });
    }

    // Create a Note
    const restaurant = new Restaurant({
        username: req.body.username,
        name: req.body.name,
        location: req.body.location,
        address: req.body.address,
        maxPeople: req.body.maxpeople, 
        category: req.body.category, 
        price: req.body.price, 
        image: req.body.image
    });

    // Save Note in the database
    restaurant.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

//get all restaurants from db
exports.getRestaurants = (req, res) => {
    
    Restaurant.find()
    .then(restaurant => {
          res.send(restaurant);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


exports.getNewestRestaurants = (req, res) => {
    
      Restaurant.aggregate([{ $sort : { updatedAt : -1 } }, { $limit : 3 }])
    .then(restaurant => {
        if(!restaurant) {
            return res.status(404).send({
                message: "Note not found with id "
            });            
        }
        
        res.statusCode = 201;
        res.send(restaurant);
          console.log(restaurant);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id "
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " 
        });
    });
    
    
};


exports.getRestaurantName = (req, res) => {
    var a = req.body.restaurant;
    Restaurant.find({"_id":  a})
    .then(restaurant => {
          res.send(restaurant);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};



exports.getRestaurantDir = (req, res) => {
    var restaurantId = req.body.restaurantId;
    console.log(restaurantId);
    Restaurant.find({"_id":  restaurantId})
    .then(restaurant => {
          res.send(restaurant);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.getUserRestaurants = (req, res) => {
    var a = req.body.a;
    Restaurant.find({"username": a})
    .then(restaurant => {  
        res.send(restaurant);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.getAdminRestaurantList = (req, res) => {
     var a = req.body.a;
    Restaurant.find({"username":  a})
    .then(restaurant => {
          res.send(restaurant);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};


exports.getRestaurantImage = (req, res) => {
     var restaurant = req.body.restaurant;
    
    Restaurant.find({"_id": restaurant})
    .then(restaurant => {  
        res.send(restaurant);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

