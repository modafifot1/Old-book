const mogoose = require("mongoose");

const userSchema = new mogoose.Schema({
    email: String,
    pass: String,
    name: String
});

let User = mogoose.model("User", userSchema, "users");
module.exports = User;