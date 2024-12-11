function pendingAnnoncesView(annonces) {
  let html = "<h1>Annonces en Attente de Validation</h1>";
  annonces.forEach((annonce) => {
    html += `
      <div>
        <h2>${annonce.titre}</h2>
        <p>${annonce.description}</p>
        <p>Prix: ${annonce.prix} €</p>
        <p>Date de publication: ${annonce.date_publication}</p>
        <form action="/admin/approve/${annonce.id}" method="POST">
          <button type="submit">Approuver</button>
        </form>
        <form action="/admin/reject/${annonce.id}" method="POST">
          <button type="submit">Rejeter</button>
        </form>
      </div>
    `;
  });
  console.log(html);
  return html;
}

module.exports = pendingAnnoncesView;
