function verifyAdmin(req, res, next) {
  /*  Vérifiez si l'utilisateur est un administrateur */
  /*  ajouter une vérification basée sur le rôle de l'utilisateur */
  if (req.userRole === "admin") {
    next();
  } else {
    res.status(403).send("Accès refusé. Vous n'êtes pas administrateur.");
  }
}

module.exports = verifyAdmin;
