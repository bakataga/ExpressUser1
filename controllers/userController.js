const User = require("../models/user");
const userView = require("../views/userView");
const loginView = require("../views/loginView");
const registerView = require("../views/registerView");
const userAnnoncesView = require("../views/userAnnoncesView");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");
const fs = require("fs");
const Annonce = require("../models/annonce");
const path = require("path");
const filePath = path.join(__dirname, "users.json");
const fetch = require("node-fetch");

function getUser(req, res) {
  const userId = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";
  db.get(sql, [userId], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Error fetching user");
    } else {
      if (row) {
        return res.json(row); /* envoie les données users a json */
      } else {
        return res.status(404).send("User not found");
      }
    }
  });
}

function showLogin(req, res) {
  console.log("GET /login");
  res.end(loginView());
}

function traiteLogin(req, res) {
  console.log("POST /login");
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ?";

  db.get(query, [username], (err, user) => {
    if (err) {
      console.error("Error fetching user from database:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    } else if (user) {
      console.log("User found:", user);
      const passwordMatch = bcrypt.compareSync(password, user.password);
      console.log("Password match:", passwordMatch);
      if (passwordMatch) {
        // Vérifier et définir le rôle en fonction du nom d'utilisateur
        const role = username === "admin" ? "admin" : user.role;

        // Générer un token JWT
        const token = jwt.sign(
          { id: user.id, username: user.username, role: user.role },
          config.jwtSecret,
          {
            /* L'ID de l'utilisateur est inclus dans le token. Cela permet d'identifier l'utilisateur de manière unique. */
            expiresIn: 86400, // 24 heures
          }
        );

        console.log("Token généré:", token);
        // Stocker le token dans un cookie
        res.cookie("token", token, { httpOnly: true, secure: true }); // HttpOnly empêche l'accès via JavaScript, Secure nécessite HTTPS
        console.log("Token stocké dans le cookie:", token);

        // Rediriger en fonction du rôle de l'utilisateur
        if (user.role === "admin") {
          return res.redirect("/admin/pending");
        } else {
          return res.redirect("/annonces/createAnnonce");
        }
      } else {
        return res.status(401).json({ error: "Invalid username or password" });
      }
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  });
}

function showRegister(req, res) {
  console.log("GET /register");
  res.end(registerView());
}

function traiteRegister(req, res) {
  console.log("POST /register");
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  // Hacher le mot de passe
  const role = username === "admin" ? "admin" : "user"; // Définir le rôle en fonction du nom d'utilisateur

  const newUser = new User(username, hashedPassword);
  const query = `INSERT INTO users (username, password,role) VALUES (?, ?,?)`;
  db.run(query, [newUser.username, newUser.password], function (err) {
    if (err) {
      console.error("Error inserting user into database:", err.message);
      return res.send("Error registering user");
    } else {
      return res.redirect("/login");
    }
  });
}

function getUsers(req, res) {
  const query = "SELECT * FROM users";
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error fetching users from database:", err.message);
      return res.send("Error fetching users");
    } else {
      return res.json(rows);
    }
  });
}

function getAnnoncesByUser(req, res) {
  const userId = req.userId;
  /* ID de l'utilisateur extrait du token
   JWT */
  const annoncesQuery = `SELECT * FROM annonces WHERE utilisateur_id = ?`;
  const favorisQuery = ` SELECT annonces.* FROM annonces JOIN favorites ON annonces.id = favorites.annonce_id WHERE favorites.user_id = ? `;
  db.all(annoncesQuery, [userId], (err, annonces) => {
    if (err) {
      console.error("Error fetching user annonces:", err.message);
      return res
        .status(500)
        .send("Erreur lors de la récupération des annonces de l'utilisateur");
    }
    db.all(favorisQuery, [userId], (err, favoris) => {
      if (err) {
        console.error("Error fetching user favorites:", err.message);
        return res
          .status(500)
          .send("Erreur lors de la récupération des favoris de l'utilisateur");
      }
      const userAnnoncesView = require("../views/userAnnoncesView");
      res.send(userAnnoncesView(annonces, favoris));
    });
  });
}

/* function getAnnoncesByUser(req, res) {
  const userId = req.userId;
  // Récupérer l'ID de l'utilisateur connecté
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
 */
function exportUsersToJson(req, res) {
  const query = "SELECT * FROM users";
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Error fetching users from database:", err.message);
      return res.send("Error fetching users");
    } else {
      const jsonData = JSON.stringify(rows, null, 2);
      fs.writeFile("users.json", jsonData, (err) => {
        if (err) {
          console.error("Error writing to file:", err.message);
          return res.send("Error writing to file");
        } else {
          return res.send("Users data has been written to users.json");
        }
      });
    }
  });
}

function logout(req, res) {
  res.clearCookie("token");
  res.redirect("/login");
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop();
    if (cookieValue) {
      return cookieValue.split(";").shift();
    }
  }
  return null;
}

function getProfile(req, res) {
  let jwtToken = req.cookies.token; // Extraire le jeton JWT depuis le cookie

  fetch("http://localhost:3000/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`, // Utiliser le jeton JWT extrait du cookie
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        console.log("Token:", data.token);
        jwtToken = data.token; /* Stocker le jeton JWT */
      } else {
        throw new Error("Token not received");
      }
    })

    .catch((error) => {
      console.error("Error fetching profile:", error);
      res.status(500).send("Error fetching profile");
    });
}

function getUserFavorites(req, res) {
  const userId = req.userId; // ID de l'utilisateur extrait du token JWT

  const query = `
    SELECT annonces.* FROM annonces
    JOIN favorites ON annonces.id = favorites.annonce_id
    WHERE favorites.user_id = ?
  `;

  db.all(query, [userId], (err, favoris) => {
    if (err) {
      console.error("Error fetching user favorites:", err.message);
      return res
        .status(500)
        .send("Erreur lors de la récupération des favoris de l'utilisateur");
    }

    const userFavoritesView = require("../views/userFavoriteView");
    res.send(userFavoritesView(favoris));
  });
}

module.exports = {
  getUser,
  userView,
  showLogin,
  traiteLogin,
  showRegister,
  traiteRegister,
  getUsers,
  exportUsersToJson,
  getAnnoncesByUser,
  logout,
  getCookie,
  getProfile,
  getUserFavorites,
};
