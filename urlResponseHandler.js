var MongoClient = require('mongodb').MongoClient;
var conversionsXML = "";
var assert = require('assert');
var nodemailer = require('nodemailer');
var express = require("express");
var app = express();

var User = require('./usermodel');
var Restaurant = require('./restaurantmodel');
var Reservation = require('./reservationmodel');
var AppRate = require('./qReservationOpinionmodel');
var RestaurantRate = require('./restaurantOpinionmodel');


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
        password: req.body.password
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
        res.send(res.statusCode);
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




//Insertar restaurante
exports.createRestaurant = (req, res) => {
    // Validate request
    if(req.body.name == "" && req.body.location == "" && req.body.maxpeople == "" && req.body.category == "" && req.body.price == "") {
        return res.status(400).send({
            message: "Restaurant info content can not be empty"
        });
    }

    // Create a Note
    const restaurant = new Restaurant({
        name: req.body.name,
        location: req.body.location,
        maxPeople: req.body.maxpeople, 
        category: req.body.category, 
        price: req.body.price
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

exports.createReservation = (req, res) => {
    
    if(req.body.username == "" && req.body.restaurant == "" && req.body.date == "" && req.body.time == "" && req.body.people == "" && req.body.name == "" && req.body.phone == "" && req.body.mail == "") {
        return res.status(400).send({
            message: "reservation info content can not be empty"
        });
    }
    console.log(req.body.date);
    console.log(req.body.restaurant);
    console.log(req.body.time);

    // Create a reservation
    const reservation = new Reservation({
        username: req.body.username, 
        restaurant: req.body.restaurant, 
        date: req.body.date, 
        time: req.body.time, 
        people: req.body.people, 
        name: req.body.name, 
        phone: req.body.phone, 
        mail: req.body.mail
    });

    // Save reservation in the database
    reservation.save()
    
    .then(data => {
        res.statusCode = 201;
        res.send(res.statusCode);
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
        rating: req.body.rating
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

    // Create a Note
    const restaurantRate = new RestaurantRate({
        username: req.body.a, 
        restaurant: req.body.restaurant,
        title: req.body.title, 
        comment: req.body.comment, 
        rating: req.body.rating
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

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

};

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};

/*
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "alvarocoches96@gmail.com",
        pass: "ilovecars"
    }
});

//insert a user to the database
function saveUser2DB(req, res) {
    
	 var user = {
        realname: req.body.realname,
        nick: req.body.nick,
        telephone: req.body.telephone, 
        pass: req.body.pass
  };
    
    var nickn = req.body.nick;
    console.log(user);
	
    MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
        
        db.collection('users').findOne({"nick": nickn}, function(err, result) {
        if(err) {
            console.log(err); 
            res.statusCode = 404;
            res.send(res.statusCode);
            
        }
        
        if(!result) { 
            db.collection('users').insertOne(user, function(err, result) {
            assert.equal(null, err);
			if (err) console.warn(err.message);
			if (err && err.message.indexOf('E11000 ') !== -1) {
				// this _id was already inserted in the database
				console.log("Error produced: " + err);
			} else {
				console.log("Información guardada: " + err);
                res.statusCode = 201;
                res.send(res.statusCode);
			}
		});
        }
        else{
            console.log('Error, user already exists');
            res.statusCode = 404;
            res.send(res.statusCode);
            
        }
	});
});
}

//insert a car to the database
function saveCar2DB(req, res) {
	  var car = {
        plate: req.body.plate,
        brand: req.body.brand,
        model: req.body.model, 
        colour: req.body.colour, 
        km: req.body.km, 
        price: req.body.price, 
        year: req.body.year, 
        horsepower: req.body.horsepower, 
        name: req.body.name, 
        phone: req.body.phone,
        mail: req.body.mail,
        localization: req.body.localization
  };

	
    MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;

		db.collection('cars').insertOne(car, function(err, result) {
            assert.equal(null, err);
			if (err) console.warn(err.message);
			if (err && err.message.indexOf('E11000 ') !== -1) {
				// this _id was already inserted in the database
				console.log("Error produced: " + err);
			} else {
				console.log("Información guardada: " + err);
                res.redirect('/indexCar.html'); 
			}
		});
	});
}

//login method
function logIn(req, res) {
    
    var nick = req.body.nick; 
    var pass = req.body.pass; 
    console.log(nick);
    console.log(pass);
    
    MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
    
    db.collection('users').findOne({"nick": nick, "pass": pass}, function(err, result) {
        if(err) {
            console.log(err); 
            return res.status(500).send();   
        }
        if(!result) { 
            console.log('Error, incorrect user info');
            res.statusCode = 404;
            res.send(res.statusCode);
            //return res.status(404).send();   
        }
        else{
            console.log('Logged In correctly');
            res.statusCode = 201;
            res.send(res.statusCode);
            }
           
        })
    });
}

//delete user from the database
function deleteUser(req, res) {
   var id = req.body.id;
   var pass = req.body.password;

     MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
   
      db.collection('users').findOne({"nick": id, "pass": pass}, function(err, result) {
        if(err) {
            console.log(err); 
            return res.status(500).send();   
        }
        
        if(!result) { 
            console.log('Error, incorrect info');
            return res.redirect("/indexUserDelete.html");
            return res.status(404).send();
        }
        else{
    
    db.collection('users').deleteOne({"nick": id, "pass": pass}, function(err, result) {
      assert.equal(null, err);
      console.log('User deleted');
      res.redirect('/index.html');
      db.close();
    });
    }
 });
});
}

//update a user from the database
function updateUser(req, res) {
 var item = {
    pass: req.body.pass
  };
   
  var nick = req.body.nick;
  var oldPass = req.body.oldPass;

  MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
      
   db.collection('users').findOne({"nick": nick, "pass":oldPass}, function(err, result) {
        if(err) {
            console.log(err); 
            return res.status(500).send();   
        }
        
        if(!result) { 
            console.log('Error, incorrect info');
            return res.redirect("/indexUserUpdate.html");
            return res.status(404).send();
        }
        else{
        
      
            db.collection('users').updateOne({"nick": nick, "pass": oldPass}, {$set: item}, function (err, result){
                assert.equal(null, err);
                console.log('Password updated');
                res.redirect('/index.html');
                db.close();
            });
        }
    });
});
}

//send email when contact to the admin
function sendEmail(req, res){
      var inputName = req.body.inputName; 
      var email = req.body.email;
      var issue = req.body.issue; 
      var text = req.body.text; 
    
    //send email
    var mailOptions={
        from: email, 
        to : "alvarocoches96@gmail.com",
        subject : issue ,
        text : text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
            res.redirect('/indexCar.html');
         }
});
    
    var mailOptions={
        to : email,
        subject : "Message correctly sent" ,
        text : 'Dear ' + inputName +', your message has been sent to the admin and you will receive an answer briefly.'
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
            res.redirect('/indexCar.html');
         }
});
    
}

//retrieve cars from the database
function retrieveCars(req, res){
    MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
    assert.equal(null, err);      
    
     db.collection('cars').find().toArray(function(err, results) {
        if(err){
        console.log(err);
        res.json(err);
    }
    else{
        //var json = JSON.stringify(results)
        //var json = res.json(results); 
        //console.log(json); 
        //res.send(JSON.stringify(results));
        res.json(results); 
    }      
  }); 
}); 
}

//send email with the forgotten pass
function forgetPass(req, res){
    var nick = req.body.nick; 
    
    MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
    
    db.collection('users').findOne({"nick": nick}, function(err, result) {
        if(err) {
            console.log(err); 
            return res.status(500).send();   
        }
        
        if(!result) { 
            console.log('Error, incorrect email');
            return res.redirect("/indexForget.html");
            return res.status(404).send();
        }
        else{
        console.log(result.pass);
            
        var mailOptions={
        to : nick,
        subject : "Forgotten Password" ,
        text: 'Dear Client, your password is: ' + result.pass
        }
        
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
            console.log(error);
             res.end("error");
         }else{
            console.log("Message sent: " + response.message);
            res.redirect('/index.html');
         }
    });
        }
        })
    });
}

//car info to json 
function carInfo(req, res){
    console.log(req.body.numberPlate); 
    var plate = req.body.numberPlate; 
    
     MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
        assert.equal(null, err);      
    
     db.collection('cars').find({"plate": plate}).toArray(function(err, results) {
        if(err){
        console.log(err);
        res.json(err);
    }
    else{
        console.log(results); 
        res.json(results); 
    }      
  }); 
}); 
}

function carInfoC(req, res){
    console.log(req.body.numberPlate); 
    var plate = req.body.numberPlate; 
    
     MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
        assert.equal(null, err);      
    
     db.collection('cars').find({"plate": plate}).toArray(function(err, results) {
        if(err){
        console.log(err);
        res.json(err);
    }
    else{
        console.log(results); 
        res.json(results); 
    }      
  }); 
}); 
}

//delete a car of the database
function deleteCar(req, res){
     console.log(req.body.matricula); 
     var plate = req.body.matricula; 
    
    MongoClient.connect('mongodb://127.0.0.1:27017/carFinder2', function(err, db) {
		if(err) throw err;
   
     db.collection('cars').deleteOne({"plate": plate}, function(err, result) {
      assert.equal(null, err);
      console.log('Car deleted');
      res.redirect('/indexCar.html');
      db.close();
    });
 });
    
}

//send email to the seller
function sellerSendMail(req, res){
    var mail = req.body.mail; 
    var sellerName = req.body.sellerName; 
    var brand = req.body.brand; 
    var model = req.body.model; 
    
    var mailOptions={
        to : mail,
        subject : "Car for sale" ,
        text : 'Dear '+ sellerName + ', someone is interested in your '+ brand + ' '+ model + '. Please be alerted of your email and phone. '
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
    
}
*/
//exports
/*
exports.saveUser2DB = saveUser2DB;
exports.saveCar2DB = saveCar2DB;
exports.logIn = logIn;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.sendEmail = sendEmail; 
exports.retrieveCars = retrieveCars; 
exports.forgetPass = forgetPass; 
exports.carInfo = carInfo; 
exports.carInfoC = carInfoC; 
exports.deleteCar = deleteCar;
exports.sellerSendMail = sellerSendMail;
*/