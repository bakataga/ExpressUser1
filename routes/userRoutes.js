const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const path = require("path");

// Définir les routes
router.get("/user/:id", userController.getUser);
router.get("/login", userController.showLogin);
router.post("/login", userController.traiteLogin);
router.get("/register", userController.showRegister);
router.post("/register", userController.traiteRegister);

// Route pour la page vierge
router.get("/createAnnonce", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/createAnnonce.js"));
});

router.get("/get-token", (req, res) => {
  const token = req.cookies.token;
  if (token) {
    res.json({ token });
  } else {
    res.status(401).json({ error: "Token non trouvé" });
  }
});

module.exports = router;