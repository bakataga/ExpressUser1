let jwtToken;

// Envoyer une requête POST à /login pour obtenir un jeton JWT
fetch("http://localhost:3000/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "votre_nom_utilisateur",
    password: "votre_mot_de_passe",
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Token:", data.token);
    jwtToken = data.token; // Stocker le jeton JWT

    // Envoyer une requête GET à /user avec le jeton JWT dans l'en-tête
    return fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {
        "x-access-token": jwtToken, // Utiliser le jeton JWT stocké
      },
    });
  })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
