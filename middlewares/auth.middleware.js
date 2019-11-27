const User = require("../models/user.model");

module.exports.validate = async (req, res, next)=>{
    let errors =[];
    const email = req.body.email;
    const pass = req.body.pass;
    if(!email){
        errors.push("Please enter your email!");
    }
    if(!pass){
        errors.push("PLease enter your password!");
    }
    if(errors.length){
        res.render("auth/login",{
            errors: errors,
            value: req.body
        })
        return;
    }
    const user = await User.findOne({email: email});
    if(!user ){
        errors.push("Email incorrect!");
    }
    else{
        if(user.pass!=pass) errors.push("Password incorrect!");
    }
    if(errors.length){
        res.render("auth/login",{
            errors: errors,
            value: req.body
        })
        return;
    }
    res.cookie("userId", user._id,{
        signed: true
    });
    res.locals.user = user;
    next();

}
module.exports.requireLogin = async (req, res, next)=>{
    if(!req.signedCookies.userId){
        res.redirect("/auth/login");
        return;
    }
    const user = await User.findOne({_id: req.signedCookies.userId});
    if(!user){
        res.redirect("/auth/login");
        return;
    }
    
    next();
}