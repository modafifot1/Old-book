const express = require("express");
const userController = require("../controllers/user.controller");

const router = express();

router.get("/users:id/my-account", userController.getMyAccount);
router.get("/users/profile", userController.getProfile);
router.post("/users/profile", userController.patchProfile);
router.get("/users/offers", userController.getOffers);
router.get("/users/sugesstions", userController.getSugesstions)

module.exports = router;