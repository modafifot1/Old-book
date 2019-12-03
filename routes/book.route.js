const express = require("express");
const multer = require("multer");

const bookController = require("../controllers/book.controller");
const bookMiddleware = require("../middlewares/book.middleware");

const router = express();

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/uploads/images');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
}) ;
let upload = multer({storage: storage});
router.get("/create", bookController.getCreate);
router.post("/create",upload.single("avatar"), bookMiddleware.postCreate, bookController.postCreate );
router.get("/:id", bookController.getId);
router.get("/:id/createOffer", bookController.getCreateOfffer);

module.exports = router;
