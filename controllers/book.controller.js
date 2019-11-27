const Book = require("../models/book.model");

module.exports.getCreate = (req, res)=>{
    res.render("books/create");
}