/* Ce fichier exporte une fonction qui retourne un formulaire HTML pour la connexion des utilisateurs.
 Le formulaire envoie une requête POST à /login */

function loginView() {
  return `<html>
<body>

<h1>Connectez-vous</h1>
<form method="POST" action="/login">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username">
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password">
        <br> 

        <input type="submit" 
 value="Login">
    </form>

</body>

  </html>`;
}

module.exports = loginView;
