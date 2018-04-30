var mongoose = require("mongoose");
var Schema  = mongoose.Schema;

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String
});

var User = mongoose.model("User", UserSchema);
module.exports = User;