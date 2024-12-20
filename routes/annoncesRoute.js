const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const createAnnonceView = require("../views/createAnnonce");
const annoncesController = require("../controllers/annoncesController");

const {
  createAnnonce,
  getAllAnnonces,
  getUserAnnonces,
  editAnnonce,
  deleteAnnonce,
} = annoncesController;

router.get("/createAnnonce", verifyToken, (req, res) => {
  res.send(createAnnonceView());
});

router.post("/createAnnonce", verifyToken, createAnnonce);
router.get("/userAnnonces", verifyToken, getUserAnnonces);
router.get("/allAnnonces", getAllAnnonces); // Suppression de verifyToken pour permettre l'accès public

router.put("/edit/:id", verifyToken, editAnnonce);
router.delete("/delete/:id", verifyToken, deleteAnnonce);

module.exports = router;
