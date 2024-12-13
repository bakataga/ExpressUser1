const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

class Annonce {
  constructor(db) {
    this.db = db;
  }

  // Créer une annonce
  createAnnonce(titre, description, prix, utilisateur_id) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO annonces (titre, description, prix, utilisateur_id, status) VALUES (?, ?, ?, ?, 'pending')`;
      this.db.run(
        query,
        [titre, description, prix, utilisateur_id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  }

  // Récupérer les annonces en attente de validation
  getPendingAnnonces() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM annonces WHERE status = 'pending'`;
      this.db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Valider une annonce
  approveAnnonce(id) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE annonces SET status = 'approved' WHERE id = ?`;
      this.db.run(query, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  // Rejeter une annonce
  rejectAnnonce(id) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE annonces SET status = 'rejected' WHERE id = ?`;
      this.db.run(query, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  // Récupérer les annonces par utilisateur
  getAnnoncesByUser(userId) {
    const sql = `SELECT * FROM annonces WHERE utilisateur_id = ? AND status = 'approved'`;
    return new Promise((resolve, reject) => {
      this.db.all(sql, [userId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  // Récupérer toutes les annonces approuvées
  getAllAnnonces() {
    const sql = `SELECT * FROM annonces WHERE status = 'approved'`;
    return new Promise((resolve, reject) => {
      this.db.all(sql, [], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }
}

module.exports = Annonce;
