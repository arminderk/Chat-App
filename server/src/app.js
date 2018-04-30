const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
var mongoose = require('mongoose');
var User = require('../models/User');

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

// Add new User
app.post('/register', (req, res) => {
    var db = req.db;
    var email = req.body.email;
    var password = req.body.password;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    var newUser = new User({
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name
    });

    newUser.save(function(error) {
        if(error) {
            console.log(error);
        }
        res.send({
            success: true,
            message: "User added!"
        })
    });
});

const port = 8081;
app.listen(port, () => console.log(`Server started on port ${port}`));