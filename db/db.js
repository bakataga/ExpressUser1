const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error(
      "Erreur lors de la connexion à la base de données:",
      err.message
    );
  } else {
    console.log("Connecté à la base de données SQLite.");
    db.run(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL, role TEXT DEFAULT 'user')",
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("Table created successfully.");
        }
      }
    );
  }
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS annonces (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    description TEXT NOT NULL,
    prix REAL NOT NULL,
    date_publication TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    utilisateur_id INTEGER,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY (utilisateur_id) REFERENCES users(id)
  )`);
});

module.exports = db;
