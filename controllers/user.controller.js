const User = require("../models/user.model");
const Book = require("../models/book.model");
const sgMail =require("@sendgrid/mail");
sgMail.setApiKey("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");


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
            const distance = distanceBetween2Points(bookOffer.lat, bookOffer.lng, book.lat, book.lng);
            bookOffer.distance = distance;
        }
    }
    res.render("users/user_suggestions",{
        book: book,
        bookOffers: bookOffers
    });

}
module.exports.postSuggestions = async (req, res)=>{
    const distanceSearch = req.body.distanceSearch;
    const id = req.params.id;
    const book = await Book.findById(id);
    const suggestionIds = book.suggestionIds;
    let bookOffers = [];
    if(suggestionIds.length!=0){
        for (const suggestionId of suggestionIds ){
            const bookOffer = await Book.findById(suggestionId.bookId);
            const distance = distanceBetween2Points(bookOffer.lat, bookOffer.lng, book.lat, book.lng);
            bookOffer.distance = distance;
            if(distance < distanceSearch)
                bookOffers.push(bookOffer);
        }
    }
    res.render("users/user_suggestions",{
        distance: distanceSearch,
        book: book,
        bookOffers: bookOffers
    });
}
module.exports.getAccept = async (req, res)=>{

    const id = req.params.id;
    const book = await Book.findById(id);
    const user = await User.findById(book.userId);
    const msg = {
        to: user.email,
        from: 'admin@gmail.com',
        subject: 'Your offer was accepted',
        text: `Your offer was accepted by userId: ${req.signedCookies.userId}`,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg);
    
    res.redirect(`/users/books/${id}/suggestions`)
}

function distanceBetween2Points(la1, lo1, la2, lo2) {
    const dLat = (la2 - la1) * (Math.PI / 180);
    const dLon = (lo2 - lo1) * (Math.PI / 180);
    const la1ToRad = la1 * (Math.PI / 180);
    const la2ToRad = la2 * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(la1ToRad) * Math.cos(la2ToRad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = 6371 * c;
    return Math.round(d);
}