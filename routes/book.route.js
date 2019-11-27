const express = require("express");
const multer = require("multer");

const upload = multer({dest: "../public/uploads/images/"});
const bookController = require("../controllers/book.controller")
const router = express();

router.get("/create", bookController.getCreate);

module.exports = router;
