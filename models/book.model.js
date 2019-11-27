const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    userId: String,
    name: String,
    type:{type: String, required:true},
    image: String,
    author: String,
    description: String,
    date: {type: Date, default: Date.now},
    address: {type: String, required: true},
    idSuggestion:[{type: String, _id:false}]
});
let Book = mongoose.model("Book", bookSchema, "books");
module.exports = Book;