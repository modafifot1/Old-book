const Book = require("../models/book.model");
const User = require("../models/user.model");

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
module.exports.postCreateOfffer = async (req, res)=>{
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
    const user = await User.findById(req.signedCookies.userId);
    let offers =user.offers;
    offers . push({
        bookId: offer._id
    });
    const userUp = await  User.findByIdAndUpdate(req.signedCookies.userId,{offers: offers});

    res.redirect(`/books/${id}`);
}