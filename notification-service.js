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
exports.getTweets = (req, res) => {

};
       
