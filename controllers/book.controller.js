const Book = require("../models/book.model");

module.exports.getCreate = (req, res)=>{
    res.render("books/create");
}

module.exports.postCreate = async (req, res)=>{
    const book = await Book.create({
        userId: req.signedCookies.userId,
        ...req.body,
        image: "/"+req.file.path.split("\\").slice(1).join("/"),
    });
    res.render("users/user_newBook",{
        book: book
    });  

}
module.exports.getId = async (req, res)=>{
    const id = req.params.id;
    const book = await Book.findById(id);
    console.log(book)
    const suggestionIds = book.suggestionIds;
    
    let bookOffers = [];
    for (const suggestionId of suggestionIds ){
        const bookOffer = await Book.findById(suggestionId.bookId);
        bookOffers.push(bookOffer);
    }
    res.render("books/book_id",{
        book: book,
        bookOffers: bookOffers
    });
}
module.exports.getCreateOfffer = async (req, res)=>{
    const id = req.params.id;
    const offer = await Book.create({
        userId: req.signedCookies.userId,
        ...req.body,
        image: "/"+req.file.path.split("\\").slice(1).join("/")
    });
    const book = await Book.findById(id);
    book.suggestionIds.push({
        bookId: offer._id
    })
    const bookUp = await  Book.findByIdAndUpdate(id,{suggestionIds: book.suggestionIds});
    res.redirect(`/books/${id}`);
}