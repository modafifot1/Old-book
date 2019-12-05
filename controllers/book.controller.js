const Book = require("../models/book.model");
const User = require("../models/user.model");
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDxXsSWNquWZi78Atj2JUj8kSlJuCTGUaU',
    Promise: Promise
  });


module.exports.getCreate = (req, res)=>{
    res.render("books/create");
}

module.exports.postCreate = async (req, res)=>{
    const response = await googleMapsClient.geocode({
        address: req.body.address
    }).asPromise();
    let lat =response.json.results[0].geometry.location.lat;
    let lng =response.json.results[0].geometry.location.lng;
    const book = await Book.create({
        userId: req.signedCookies.userId,
        ...req.body,
        image: "/"+req.file.path.split("\\").slice(1).join("/"),
        lat: lat,
        lng: lng
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
    const yourBooks = await Book.find({userId: req.signedCookies.userId});
    res.render("books/book_id",{
        book: book,
        bookOffers: bookOffers,
        yourBooks: yourBooks
    });
}
module.exports.postCreateOfffer = async (req, res)=>{
    const id = req.params.id;
    const book = await Book.findById(id);
    book.suggestionIds.push({
        bookId: req.body.type
    })
    const bookUp = await  Book.findByIdAndUpdate(id,{suggestionIds: book.suggestionIds});
    const user = await User.findById(req.signedCookies.userId);
    user.offers . push({
        bookId: req.body.type
    });
    const userUp = await  User.findByIdAndUpdate(req.signedCookies.userId,{offers: user.offers});

    res.redirect(`/books/${id}`);
}