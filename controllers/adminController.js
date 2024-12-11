const db = require("../db/db");
const Annonce = require("../models/annonce");
const pendingAnnoncesView = require("../views/pendingAnnoncesView");

function getPendingAnnonces(req, res) {
  const annonce = new Annonce(db);
  annonce
    .getPendingAnnonces()
    .then((annonces) => {
      res.send(pendingAnnoncesView(annonces));
    })
    .catch((err) => {
      console.error(
        "Erreur lors de la récupération des annonces en attente:",
        err.message
      );
      res
        .status(500)
        .send("Erreur lors de la récupération des annonces en attente");
    });
}

function approveAnnonce(req, res) {
  const id = req.params.id;
  const annonce = new Annonce(db);
  annonce
    .approveAnnonce(id)
    .then(() => {
      res.redirect("/admin/pending");
    })
    .catch((err) => {
      console.error("Erreur lors de l'approbation de l'annonce:", err.message);
      res.status(500).send("Erreur lors de l'approbation de l'annonce");
    });
}

function rejectAnnonce(req, res) {
  const id = req.params.id;
  const annonce = new Annonce(db);
  annonce
    .rejectAnnonce(id)
    .then(() => {
      res.redirect("/admin/pending");
    })
    .catch((err) => {
      console.error("Erreur lors du rejet de l'annonce:", err.message);
      res.status(500).send("Erreur lors du rejet de l'annonce");
    });
}

module.exports = {
  getPendingAnnonces,
  approveAnnonce,
  rejectAnnonce,
};
