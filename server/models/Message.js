var mongoose = require("mongoose");
var Schema  = mongoose.Schema;

var MessageSchema = new Schema({
    to: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    from: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    message: String
});

var Message = mongoose.model("Message", MessageSchema);
module.exports = Message;