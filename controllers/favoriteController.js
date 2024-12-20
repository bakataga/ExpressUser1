const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

function addFavorite(req, res) {
  const userId = req.userId; // ID de l'utilisateur extrait du token JWT
  const { annonceId } = req.body; // ID de l'annonce à ajouter aux favoris

  const query = `INSERT INTO favorites (user_id, annonce_id) VALUES (?, ?)`;
  db.run(query, [userId, annonceId], function (err) {
    if (err) {
      console.error("Error adding favorite:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Error adding favorite" });
    } else {
      // Récupérer les détails de l'annonce ajoutée
      db.get(
        `SELECT * FROM annonces WHERE id = ?`,
        [annonceId],
        (err, annonce) => {
          if (err) {
            console.error("Error fetching annonce:", err.message);
            return res
              .status(500)
              .json({ success: false, message: "Error fetching annonce" });
          } else {
            return res.status(200).json({ success: true, annonce });
          }
        }
      );
    }
  });
}

module.exports = {
  addFavorite,
};
