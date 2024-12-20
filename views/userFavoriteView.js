function userAnnoncesView(annonces, favoris) {
  let html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vos Annonces</title>
        <link href="/css/style.css" rel="stylesheet" />
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
        <script src="/js/addFavorite.js"></script>
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
                <a class="nav-link" href="/annonces/createAnnonce">Créer une annonce</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/annonces/allAnnonces">Toutes les annonces</a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Contenu principal -->
        <div class="container mt-5">
          <h1>Vos Annonces</h1>
  `;

  annonces.forEach((annonce) => {
    html += `
      <div class="poster">
        <h2>${annonce.titre}</h2>
        <p>${annonce.description}</p>
        <p>Prix: ${annonce.prix} €</p>
      </div>
    `;
  });

  html += `
        </div>
        <div id="favoriteList">
          <h2>Mes Favoris</h2>
  `;

  favoris.forEach((favori) => {
    html += `
      <div class="poster">
        <h3>${favori.titre}</h3>
        <p>${favori.description}</p>
        <p>Prix: ${favori.prix} €</p>
      </div>
    `;
  });

  html += `
        </div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.amazonaws.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </body>
    </html>
  `;

  return html;
}

module.exports = userAnnoncesView;
