const jwt = require("jsonwebtoken");
const config = require("../config/config");

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // Si tout est bon, sauvegarder l'id pour les prochaines requêtes
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
