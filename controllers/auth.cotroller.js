
const User = require("../models/user.model");
const Book = require("../models/book.model");

module.exports.get = (req, res)=>{
    res.render("auth/login");
}
module.exports.post = async (req, res)=>{
    res.redirect("/books");
}
module.exports.getLogout = (req, res)=>{
    res.clearCookie("userId");
    res.redirect("/books");
}