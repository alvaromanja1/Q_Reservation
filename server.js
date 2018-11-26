// Load the express library, which we installed using npm
var express = require("express");
var app = express();
//var server = require('http').Server(app);
var socket = require('socket.io');
var bodyParser = require('body-parser');
var objectId = require('mongodb').ObjectID;
//var urlResponseHandlers = require("./urlResponseHandler");
var controller = require("./controller");
var dbConfig = require('./database.config');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.redirect("index.html");
});


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


require('./api-gateway')(app);

var port = process.env.PORT || 2000;
var server = app.listen(port, function(){
  console.log("Listening on " + port);
});

var io = socket(server);
io.on('connection', function(socket) {
	console.log('A new client has been connected');
    
    socket.on('test', function(data){
        console.log(data.data + "Dataname");
        var message = data.data + " restaurant has been added to the app, please let's have a look."
        socket.broadcast.emit('test', message);
    });
});