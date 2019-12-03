const Book = require("../models/book.model");
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyDxXsSWNquWZi78Atj2JUj8kSlJuCTGUaU',
    Promise: Promise
  });

module.exports.getCreate = (req, res)=>{
    res.render("books/create");
}

module.exports.postCreate = async (req, res)=>{
  
//     const address = req.body.address;
//     console.log(address);
//     let lat = 0;
//     let lng = 0;
//      const response = await googleMapsClient.geocode({
//         address: address
//       }).asPromise();
//    lat = response.json.results[0].geometry.location.lat;
//    lng = response.json.results[0].geometry.location.lng;
    const book = await Book.insertMany({//create
        userId: req.signedCookies.userId,
        name: req.body.name,
        type: req.body.type,
        image: "/"+req.file.path.split("\\").slice(1).join("/"),
        author: req.body.author,
        description: req.body.description,
        address: req.body.address

    });
    res.render("books/index",{
        books: book
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
module.exports.getCreateOfffer = (req, res)=>{
    res.render("books/book_createOffer");
}