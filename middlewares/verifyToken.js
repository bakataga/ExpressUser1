const jwt = require("jsonwebtoken");
const config = require("../config/config");

function verifyToken(req, res, next) {
  const token = req.cookies.token || req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Access Denied: No Token Provided!");
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    // Vérifier que le token décodé est de type JwtPayload
    if (typeof decoded !== 'string' && 'id' in decoded && 'role' in decoded) {
      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    } else {
      return res.status(401).send("Invalid Token");
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
}

module.exports = verifyToken;
