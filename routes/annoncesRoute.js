const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const createAnnonceView = require("../views/createAnnonce");
const {
  createAnnonce,
  getAnnonces,
} = require("../controllers/annoncesController");

router.get("/createAnnonce", verifyToken, (req, res) => {
  res.send(createAnnonceView());
});

router.post("/createAnnonce", verifyToken, createAnnonce);
router.get("/", verifyToken, getAnnonces);
module.exports = router;
