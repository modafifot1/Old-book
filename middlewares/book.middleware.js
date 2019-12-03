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