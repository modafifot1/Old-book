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
    lat: Number,
    lng: Number,
    suggestionIds:[ //suggestion
        {
            _id: false,
            bookId: String
        }
    ]
});
let Book = mongoose.model("Book", bookSchema, "books");
module.exports = Book;