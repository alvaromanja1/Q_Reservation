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

exports.createReservation = (req, res) => {
    
    var username = req.body.username;
    var restaurant = req.body.restaurant;
    var restaurantName = req.body.restaurantName;
    var date = req.body.date; 
    var time = req.body.time; 
    var people = req.body.people;
    var name = req.body.name;
    var phone = req.body.phone;
    var mail = req.body.mail;
    var image =  req.body.image;
    
    if(req.body.username == "" && req.body.restaurant == "" && req.body.date == "" && req.body.time == "" && req.body.people == "" && req.body.name == "" && req.body.phone == "" && req.body.mail == "") {
        return res.status(400).send({
            message: "reservation info content can not be empty"
        });
    }

    // Create a reservation
    const reservation = new Reservation({
        username: req.body.username, 
        restaurant: req.body.restaurant, 
        restaurantName: req.body.restaurantName,
        date: req.body.date, 
        time: req.body.time, 
        people: req.body.people, 
        name: req.body.name, 
        phone: req.body.phone, 
        mail: req.body.mail, 
        image: req.body.image
    });

    // Save reservation in the database
    reservation.save()
    
    .then(data => {
        res.statusCode = 201;
        res.send(res.statusCode);
        
        var mailOptions={
        to : mail,
        subject : "Reservation processed" ,
        text: 'Dear ' +username+', your reservation has been correctly processed. We will be waiting you in '+ restaurantName+ ' restaurant at '+time+' -  '+date+'.'
        }
        
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
            console.log(error);
             res.end("error");
         }else{
            console.log("Message sent: " + response.message);
         }
    });
        
        
        
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

exports.getReservations = (req, res) => {
    
    var a = req.body.a;
    Reservation.find({"username": a})
    .then(reservation => {  
        res.send(reservation);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.getReservationInfo = (req, res) => {
    
    var reservationId = req.body.reservationId;
    //console.log(reservationId);
    Reservation.find({"_id": reservationId})
    .then(reservation => {
        console.log(reservation);
        res.send(reservation);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.deleteReservation = (req, res) => {
    
    var reservationId = req.body.reservationId;
    Reservation.deleteOne({"_id": reservationId})
    .then(reservation => {
        res.send(reservation);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.modifyReservation = (req, res) => {
    
    var reservationId = req.body.reservationId;
    var restaurant = req.body.restaurant;
    var date = req.body.date;
    var time = req.body.time;
    var people = req.body.people;
    var name = req.body.name;
    var mail = req.body.mail;
    var phone = req.body.phone;
    
    Reservation.updateOne({ "_id": reservationId}, { $set: { restaurant: restaurant, date: date, time: time, people: people, name: name, phone: phone, mail: mail }})
    .then(reservation => {
        console.log(reservation);
        res.send(reservation);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
     
};
