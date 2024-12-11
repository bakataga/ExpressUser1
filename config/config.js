module.exports = {
  sessionSecret: process.env.SESSION_SECRET || "votre_clé_secrète_par_défaut",
  jwtSecret: process.env.JWT_SECRET || "votre_clé_secrète_jwt_par_défaut",
};
