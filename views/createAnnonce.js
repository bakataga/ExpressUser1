function createAnnonceView() {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Créer une Annonce</title>
        <link href="/css/style.css" rel="stylesheet" />
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body class="annonces-page">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-custom">
          <a class="navbar-brand" href="#">AuCoinDeLaRue</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <a class="nav-link" href="/">Se déconnecter</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/annonces/userAnnonces">Mes annonces</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/annonces/allAnnonces">Toutes les annonces</a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Contenu principal -->
        <div class="container mt-5">
          <h1>Créer une Annonce</h1>
          <form action="/annonces/createAnnonce" method="POST">
            <label for="titre">Titre:</label>
            <input type="text" id="titre" name="titre" required><br>
            <label for="description">Description:</label>
            <textarea id="description" name="description" required></textarea><br>
            <label for="prix">Prix:</label>
            <input type="number" id="prix" name="prix" required><br>
            <button type="submit">Créer l'annonce</button>
          </form>
        </div>

        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.amazonaws.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <script src="/js/script.js"></script>
      </body>
    </html>
  `;
}

module.exports = createAnnonceView;
