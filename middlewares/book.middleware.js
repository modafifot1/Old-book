const Book = require("../models/book.model");

module.exports.get = async(req, res)=>{
    const books = Book.find();
    res.render("books/index",{
        books: books
    })
}