require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const Book = require("./models/book.model");
const User = require("./models/user.model");

const authRoute = require("./routes/auth.route");
const bookRoute = require("./routes/book.route");
const userRoute = require("./routes/user.route");

const authMiddleware = require("./middlewares/auth.middleware");

const app = express();

port = process.env.PORT;
sessionSecret = process.env.SESSION_SECRET;
mongo_url = process.env.MONGO_URL;

mongoose.connect(mongo_url);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("public"));
app.use(cookieParser(sessionSecret));

app.get("/home", (req, res)=>{
    res.render("index");
})
app.get("/books", async(req, res)=>{
    const user = await User.findById(req.signedCookies.userId);
    const books = await Book.find();
    res.render("books/index",{
        books: books,
        user: user
    })
});

app.use("/auth", authRoute);
app.use("/books",authMiddleware.requireLogin, bookRoute);
app.use("/", authMiddleware.requireLogin, userRoute);


app.listen(port, ()=>{
    console.log(`Listenning Port: ${port}`);
})
