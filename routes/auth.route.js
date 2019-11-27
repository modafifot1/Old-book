const express = require("express");
const authController = require("../controllers/auth.cotroller");
const authMiddleware =  require("../middlewares/auth.middleware")

const router = express();

router.get("/login", authController.get);
router.post("/login",authMiddleware.validate, authController.post);

module.exports = router;