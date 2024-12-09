const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
    db.run("DELETE FROM users", (err) => {
      if (err) {
        console.error("Error deleting data from users table:", err.message);
      } else {
        console.log("All data deleted from users table.");
      }
    });
  }
});
