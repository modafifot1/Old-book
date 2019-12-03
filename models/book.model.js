const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    userId: String,
    name: {type: String, required: true},
    type:{type: String, required:true},
    image: String,
    author: String,
    description: String,
    date: {type: Date, default: Date.now},
    address: String,
    suggestionIds:[
        {
            bookId: String
        }
    ]
});
let Book = mongoose.model("Book", bookSchema, "books");
module.exports = Book;