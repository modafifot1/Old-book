const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    userId: String,
    name: {type: String, required: true},
    type:{type: String, required:true},
    image: String,//imagePath
    author: String,
    description: String,
    date: {type: Date, default: Date.now},
    address: String,
    suggestionIds:[ //suggestion
        {
            bookId: String
        }
    ]
});
let Book = mongoose.model("Book", bookSchema, "books");
module.exports = Book;