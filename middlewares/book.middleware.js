const Book = require("../models/book.model");




module.exports.postCreate = (req, res, next)=>{
    let errors = [];
    console.log(req.body.type);
    if(!req.body.name){
        errors.push("Please enter the name of book!");
    }
    if(req.body.type=="Choose..."){
        errors.push("Please select type of book!");
    }
    if(!req.body.address){
        errors.push("Please enter the address");
    }
    if(errors.length){
        res.render("books/create", {
            errors: errors,
            value: req.body
        })
        return;
    }
    next();
}
module.exports.postCreateOffer = async (req, res, next)=>{
    let errors = [];
    console.log(req.body);
    if(!req.body.name){
        errors.push("Please enter the name of book!");
    }
    if(req.body.type=="Choose..."){
        errors.push("Please select type of book!");
    }
    if(!req.body.address){
        errors.push("Please enter the address");
    }
    const id = req.params.id;
    const book = await Book.findById(id);
    const suggestionIds = book.suggestionIds;    
    let bookOffers = [];

    for (const suggestionId of suggestionIds ){
        const bookOffer = await Book.findById(suggestionId.bookId);
        bookOffers.push(bookOffer);
    }
    if(errors.length){
        res.render("books/book_id", {
            book: book,
            bookOffers: bookOffers,
            errors: errors,
            value: req.body
        })
        return;
    }
    next();
}