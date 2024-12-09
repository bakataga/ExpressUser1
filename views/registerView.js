/* Ce fichier exporte une fonction qui retourne un formulaire HTML pour l'enregistrement des utilisateurs. 
Le formulaire envoie une requête POST à /register. */

function registerView() {
  return `<html>
<head>
    <title>Enregistrez vous</title>
</head>
<body>
    <form method="POST" action="/register">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
       
        <input type="submit" value="s'inscrire">
    </form>
    <p>Déjà inscrit ? <a href="/login">Connectez-vous ici</a></p>
</body>
</html>`;
}

module.exports = registerView;
