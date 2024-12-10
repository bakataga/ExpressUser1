const User = require("../models/user");
const userView = require("../views/userView");
const loginView = require("../views/loginView");
const registerView = require("../views/registerView");

const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database.sqlite");

function getUser(req, res) {
  const userId = req.params.id; // Assuming you're using a dynamic route like /users/:id
  const sql = "SELECT * FROM users WHERE id = ?";
  db.get(sql, [userId], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Error fetching user");
    } else {
      if (row) {
        return res.json(row); // Send the user data as JSON
      } else {
        return res.status(404).send("User not found");
      }
    }
  });

  console.log("GET /user");
  res.json({ message: "User information retrieved successfully" });
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
        // Générer un token JWT
        const token = jwt.sign(
          { id: user.id, username: user.username },
          config.secret,
          {
            expiresIn: 86400, // 24 heures
          }
        );

        console.log("Token généré:", token);
        // Stocker le token dans un cookie
        res.cookie("token", token, { httpOnly: true, secure: true }); // HttpOnly empêche l'accès via JavaScript, Secure nécessite HTTPS
        // Rediriger vers une page vierge
        return res.redirect("/blank");
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
  const newUser = new User(username, hashedPassword);
  const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
  db.run(query, [newUser.username, newUser.password], function (err) {
    if (err) {
      console.error("Error inserting user into database:", err.message);
      return res.send("Error registering user");
    } else {
      return res.send(`User registered with Username: ${newUser.username}`);
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

const fs = require("fs");

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

module.exports = {
  getUser,
  userView,
  showLogin,
  traiteLogin,
  showRegister,
  traiteRegister,
  getUsers,
  exportUsersToJson,
};
