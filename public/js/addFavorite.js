function addFavoriteToUser(annonceId) {
  fetch("/favorites/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${document.cookie.split("token=")[1]}`,
    },
    body: JSON.stringify({ annonceId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Annonce ajoutée aux favoris");
        // Ajouter l'annonce à la liste des favoris de l'utilisateur
        const favoriteList = document.getElementById("favoriteList");
        if (favoriteList) {
          const newFavorite = document.createElement("div");
          newFavorite.innerHTML = `
            <h3>${data.annonce.titre}</h3>
            <p>${data.annonce.description}</p>
            <p>Prix: ${data.annonce.prix} €</p>
          `;
          favoriteList.appendChild(newFavorite);
        } else {
          console.error("Element favoriteList not found");
        }
      } else {
        alert("Erreur lors de l'ajout aux favoris");
      }
    })
    .catch((error) => {
      console.error("Error adding favorite:", error);
      alert("Erreur lors de l'ajout aux favoris");
    });
}
