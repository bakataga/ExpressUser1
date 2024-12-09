/* Ce fichier est le fichier principal du serveur. 
Il configure un serveur Express et définit des routes pour les actions liées aux utilisateurs (connexion, enregistrement, etc.). 
Il utilise body-parser pour analyser les corps des requêtes entrantes et cookie-parser pour gérer les cookies. */

const express = require("express");
const app = express();
const {
  getUser,
  showLogin,
  traiteLogin,
  showRegister,
  traiteRegister,
  exportUsersToJson,
} = require("./controllers/userController");
const bodyParser = require("body-parser");
const verifyToken = require("./middlewares/verifyToken");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const port = 3000;
const path = require("path");
const userRoutes = require("./userRoutes");

app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "magma_crypt",
    name: "uniqueSessionID",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
console.log(session);

app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/user", verifyToken, (req, res) => {
  getUser(req, res);
});

app.get("/login", (req, res) => {
  showLogin(req, res);
});

app.post("/login", (req, res) => {
  traiteLogin(req, res);
  console.log(verifyToken);
});

app.get("/register", (req, res) => {
  showRegister(req, res);
});

app.post("/register", (req, res) => {
  traiteRegister(req, res);
});

app.get("/export-users", (req, res) => {
  exportUsersToJson(req, res);
});

app.listen(3000, () => {
  console.log(`le serveurtourne sur le port ${3000}`);
  console.log(getUser);
});
