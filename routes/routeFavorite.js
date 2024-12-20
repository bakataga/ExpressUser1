const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const favoritesController = require("../controllers/favoriteController");

router.post("/add", verifyToken, favoritesController.addFavorite);

module.exports = router;
