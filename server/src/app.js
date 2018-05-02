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

// Get all Users
app.get('/users', (req, res) => {
    User.find({}, '_id username', function(error, users) {
        if(error) {
            console.log(error);
        }
        res.send({ 
            users: users
        });
    });
});

// Add new message
app.post('/messages', (req, res) => {
    var db = req.db;
    var message = req.body.message;
    var to = req.body.to;
    var from = req.body.from;

    var newMessage = new Message ({
        to: to,
        from: from,
        message: message
    });

    newMessage.save(function(error) {
        if(error) {
            console.log(error);
        }
        res.send({
            saved: true,
            message: "Message Saved"
        });
    });
});

const port = 8081;
app.listen(port, () => console.log(`Server started on port ${port}`));