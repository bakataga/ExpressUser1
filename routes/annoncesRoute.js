const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const createAnnonceView = require("../views/createAnnonce");
const {
  createAnnonce,
  getAllAnnonces,
  getUserAnnonces,
} = require("../controllers/annoncesController");

router.get("/createAnnonce", verifyToken, (req, res) => {
  res.send(createAnnonceView());
});

router.post("/createAnnonce", verifyToken, createAnnonce);
router.get("/userAnnonces", verifyToken, getUserAnnonces);
module.exports = router;
router.get("/allAnnonces", verifyToken, getAllAnnonces);
