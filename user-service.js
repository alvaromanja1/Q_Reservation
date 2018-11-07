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
exports.create = (req, res) => {
    
    
    // Validate request
    if(req.body.name == "" && req.body.username == "" && req.body.email == "" && req.body.password == "") {
        return res.status(400).send({
            message: "User info content can not be empty"
        });
    }

    // Create a Note
    const user = new User({
        name: req.body.name, 
        username: req.body.username, 
        email: req.body.email, 
        password: req.body.password, 
        hasRestaurant: req.body.hasRestaurant, 
        image: req.body.image
    });

    // Save Note in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

//login
exports.login = (req, res) => {
     
    var username = req.body.username; 
    var password = req.body.password; 
    
    console.log(username);
    console.log(password);
    
    User.findOne({"username": username, "password": password})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Note not found with id "
            });            
        }
        
        res.statusCode = 201;
        res.send(user);
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


exports.updatePass = (req, res) => {
    
    var username = req.body.username; 
    var oldPass = req.body.oldPass; 
    var newPass = req.body.newPass;
    
    User.updateOne({ username: username, password:oldPass}, { $set: { password: newPass }})
    .then(user => {
        console.log(user);
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
    
};

exports.getUserInfo = (req, res) => {
    var user = req.body.a;
    User.find({"username":  user})
    .then(user => {
          res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

