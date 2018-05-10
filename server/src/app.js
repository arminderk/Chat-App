const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('../models/User');
var Message = require('../models/Message');

mongoose.connect('mongodb://localhost:27017/FinalProject');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection Successful");
});

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Socket Connection
io.sockets.on('connection', function(socket){
    console.log('a user connected');

    // Join a user to their own private room
    socket.on('join', function(data) {
        socket.join(data.userID);
    });

    // A new message was created
    socket.on('newMessage', function(data) {
        // Add new message
        let msgCollection = db.collection('messages');
        var message = data.newMessage.message;
        var to = data.newMessage.to;
        var from = data.newMessage.from;

        if(to !== '' && message !== '' && from !== '') {
            var newMessage = new Message ({
                to: to,
                from: from,
                message: message
            });
            
            // Insert the message into the DB
            msgCollection.insert(newMessage, function() {
                
                // Emit the newly create message to sender and receiver
                io.sockets.in(to.id).emit('message', {fromUsername: from.username, message: message, message_id: newMessage._id})
                io.sockets.in(from.id).emit('message', {fromUsername: from.username, message: message, message_id: newMessage._id})
                io.sockets.in(from.id).emit('sent', {newMessage: newMessage})
                io.sockets.in(to.id).emit('received', {newMessage: newMessage})
            });
        }
    });
});

// Register new User
app.post('/register', (req, res) => {
    var db = req.db;
    var password = req.body.password;
    var username = req.body.username;

    var newUser = new User({
        username: username,
        password: password
    });

    newUser.save(function(error) {
        if(error) {
            res.send({
                error: error
            })
        }
        res.send({
            success: true,
            userID: newUser._id
        })
    });
});

// Login User
app.get('/login', (req, res) => {
    var db = req.db;
    var username = req.query.username;
    var password = req.query.password;

    User.find({"username": username}, function(error, user) {
        if(error) {
            console.log(error);
        }
        if(user.length !== 0 && user[0].password === password) {
            res.send({
                login: true,
                userID: user[0]._id 
            })
            console.log("true");
        }
        else {
            res.send({
                login: false
            })
            console.log("false");
        }
    });
});

// Get specific User
app.get('/user', (req, res) => {
    var db = req.db;
    var userID = req.query.userID;

    User.find({_id: userID}, 'username', function(error, user) {
        if(error) {
            console.log(error);
        }
        res.send({ 
            username: user[0].username
        });
    })
});

// Get all Users except current
app.get('/users', (req, res) => {
    var db = req.db;
    var userID = req.query.userID;

    User.find({_id: {$ne: userID}}, '_id username', function(error, users) {
        if(error) {
            console.log(error);
        }
        res.send({ 
            users: users
        });
    });
});

// Get Sent Messages
app.get('/sent', (req, res) => {
    var db = req.db;
    var userID = req.query.userID;

    Message.find({"from.id": userID}).limit(50).sort({_id: -1}).exec(function(error, sent){
        if(error) {
            console.log(error);
        }
        res.send({ 
            sent: sent
        });
    });
});

app.get('/received', (req, res) => {
    var db = req.db;
    var userID = req.query.userID;

    Message.find({"to.id": userID}).limit(50).sort({_id: -1}).exec(function(error, received) {
        if(error) {
            console.log(error);
        }
        res.send({ 
            received: received
        });
    });
});

const port = 8081;
http.listen(port, () => console.log(`Server started on port ${port}`));