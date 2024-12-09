/* Ce fichier configure une connexion à une base de données SQLite 
et crée une table users si elle n'existe pas déjà. 
Il exporte l'objet db pour être utilisé dans d'autres parties de votre application. */

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("error");
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL)",
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
