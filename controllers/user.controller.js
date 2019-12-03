const User = require("../models/user.model");
const Book = require("../models/book.model");


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
    console.log(user);
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
module.exports.getSugesstions = async (req, res)=>{
    const id = req.signedCookies.userId;
    const books = await Book.find({userId: id});
    res.render("users/user_suggestions",{
        books: books
    });
}