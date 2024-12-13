const db = require("../db/db");
const Annonce = require("../models/annonce");
const allAnnoncesView = require("../views/allAnnoncesView");
const userAnnoncesView = require("../views/userAnnoncesView");
const pendingAnnoncesView = require("../views/pendingAnnoncesView");

function createAnnonce(req, res) {
  const { titre, description, prix } = req.body;
  const utilisateur_id = req.userId; // Récupérer l'ID de l'utilisateur connecté

  const annonce = new Annonce(db);
  annonce
    .createAnnonce(titre, description, prix, utilisateur_id)
    .then(() => {
      res.redirect(
        "/annonces/userAnnonces?message=Votre annonce est en attente de validation"
      );
    })
    .catch((err) => {
      console.error("Erreur lors de la création de l'annonce:", err.message);
      res.status(500).send("Erreur lors de la création de l'annonce");
    });
}

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
  const annonceId = req.params.id;
  const annonce = new Annonce(db);
  annonce
    .approveAnnonce(annonceId)
    .then(() => {
      res.redirect("/annonces/pending");
    })
    .catch((err) => {
      console.error("Erreur lors de l'approbation de l'annonce:", err.message);
      res.status(500).send("Erreur lors de l'approbation de l'annonce");
    });
}

function getUserAnnonces(req, res) {
  const userId = req.userId; // Récupérer l'ID de l'utilisateur connecté
  const annonce = new Annonce(db);
  annonce
    .getAnnoncesByUser(userId)
    .then((annonces) => {
      res.send(userAnnoncesView(annonces));
    })
    .catch((err) => {
      console.error(
        "Erreur lors de la récupération des annonces de l'utilisateur:",
        err.message
      );
      res
        .status(500)
        .send("Erreur lors de la récupération des annonces de l'utilisateur");
    });
}

function getAllAnnonces(req, res) {
  const annonce = new Annonce(db);
  annonce
    .getAllAnnonces()
    .then((annonces) => {
      res.send(allAnnoncesView(annonces));
    })
    .catch((err) => {
      console.error(
        "Erreur lors de la récupération de toutes les annonces:",
        err.message
      );
      res
        .status(500)
        .send("Erreur lors de la récupération de toutes les annonces");
    });
}

module.exports = {
  createAnnonce,
  getPendingAnnonces,
  approveAnnonce,
  getUserAnnonces,
  getAllAnnonces,
};
