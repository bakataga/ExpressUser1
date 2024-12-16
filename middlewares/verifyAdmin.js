const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();
const config = require("../config/config");

// Ouvrir la base de données
const db = new sqlite3.Database("./database.sqlite");

function verifyAdmin(req, res, next) {
  const token = req.cookies.token || req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Access Denied: No Token Provided!");
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    // Vérifier que le token décodé est de type JwtPayload
    if (typeof decoded !== "string" && "id" in decoded) {
      const userId = decoded.id;

      // Requête SQL pour récupérer le rôle de l'utilisateur
      const query = "SELECT role FROM users WHERE id = ?";
      db.get(query, [userId], (err, row) => {
        if (err) {
          console.error("Error fetching user role from database:", err.message);
          return res.status(500).send("Internal Server Error");
        }
        if (!row) {
          return res.status(404).send("User not found");
        }
        if (row.role !== "admin") {
          return res
            .status(403)
            .send(
              "Access Denied: You don't have correct privilege to perform this operation"
            );
        }
        req.userId = userId;
        next();
      });
    } else {
      return res.status(401).send("Invalid Token");
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}

module.exports = verifyAdmin;
