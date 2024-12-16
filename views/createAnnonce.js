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
     
      <script>
      history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};
</script>
     
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
         <form action="/annonces/createAnnonce" method="POST" class="form-container"> 
         <div class="form-group">
          <label for="titre">Titre:</label> 
          <input type="text" class="form-control input-black-border" id="titre" name="titre" required> 
          </div> 
          <div class="form-group"> 
          <label for="description">Description:</label> 
          <textarea class="form-control input-black-border" id="description" name="description" required></textarea> 
          </div> <div class="form-group"> 
          <label for="prix">Prix:</label>
           <input type="number" class="form-control input-black-border" id="prix" name="prix" required> 
           </div> <button type="submit" class="btn btn-custom"> 
           <i class="fas fa-envelope"></i> Créer l'annonce </button>
            </form> 
            </div>
            
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.amazonaws.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
       
    </html>
  `;
}

module.exports = createAnnonceView;
