
module.exports.get = (req, res)=>{
    res.render("auth/login");
}
module.exports.post = (req, res)=>{
    
    res.render("index");
}
module.exports.getLogout = (req, res)=>{
    res.clearCookie("userId");
    res.redirect("/books");
}