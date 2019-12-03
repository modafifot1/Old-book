const User = require("../models/user.model");
const Book = require("../models/book.model");
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDxXsSWNquWZi78Atj2JUj8kSlJuCTGUaU',
    Promise: Promise
  });

module.exports.getMyAccount = (req, res)=>{
    res.render("users/my-account");
}
module.exports.getProfile = async (req, res)=>{
    const id =req.signedCookies.userId;
    const user = await User.findById(id);
    res.render("users/user_profile",{
        user: user._doc
    })
}
module.exports.patchProfile = async (req, res)=>{
    const id = req.signedCookies.userId;
    const user = await User.updateOne({_id: id}, req.body);
    if(!user.ok){
        res.render("users/my-account");
    }
    else{
        res.redirect("/users/profile");
    }
}
module.exports.getOffers = async (req, res)=>{
    const id = req.signedCookies.userId;
    const user = await User.findById(id);
    const offers = user.offers;
    let books =[];
    for(const offer of offers){
        const book = await Book.findById(offer.bookId);
        books.push(book);
    }
    res.render("users/user_offers",{
        books: books
    });

}
module.exports.getBooks = async (req, res)=>{
    const id = req.signedCookies.userId;
    const books = await Book.find({userId: id});
    res.render("users/user_books",{
        books: books
    });
}
module.exports.getSuggestions = async (req, res)=>{

    const id = req.params.id;
    const book = await Book.findById(id);
    const suggestionIds = book.suggestionIds;
    let bookOffers = [];
    if(suggestionIds.length!=0){
        for (const suggestionId of suggestionIds ){
            const bookOffer = await Book.findById(suggestionId.bookId);
            bookOffers.push(bookOffer);
            const response = await googleMapsClient.geocode({
                address: bookOffer.address
            }).asPromise();
            let lat =response.json.results[0].geometry.location.lat;
            let lng =response.json.results[0].geometry.location.lng;
        }
    }
    res.render("users/user_suggestions",{
        book: book,
        bookOffers: bookOffers
    });

}