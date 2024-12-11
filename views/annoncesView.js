function annoncesView(annonces) {
  let html = "<h1>Liste des Annonces</h1>";
  annonces.forEach((annonce) => {
    html += `
      <div>
        <h2>${annonce.titre}</h2>
        <p>${annonce.description}</p>
        <p>Prix: ${annonce.prix} €</p>
      </div>
    `;
  });
  return html;
}

module.exports = annoncesView;
