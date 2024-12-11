const db = require("../db/db");
const Annonce = require("../models/annonce");
const annoncesView = require("../views/annoncesView");

function createAnnonce(req, res) {
  const { titre, description, prix } = req.body;
  const utilisateur_id = req.userId; // Récupérer l'ID de l'utilisateur connecté

  const annonce = new Annonce(db);
  annonce
    .createAnnonce(titre, description, prix, utilisateur_id)
    .then(() => {
      res.redirect("/annonces");
    })
    .catch((err) => {
      console.error("Erreur lors de la création de l'annonce:", err.message);
      res.status(500).send("Erreur lors de la création de l'annonce");
    });
}
function getAnnonces(req, res) {
  const annonce = new Annonce(db);
  annonce
    .getAnnonces()
    .then((annonces) => {
      res.send(annoncesView(annonces));
    })
    .catch((err) => {
      console.error(
        "Erreur lors de la récupération des annonces:",
        err.message
      );
      res.status(500).send("Erreur lors de la récupération des annonces");
    });
}

module.exports = { createAnnonce, getAnnonces };
