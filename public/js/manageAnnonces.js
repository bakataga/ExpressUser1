function editAnnonce(annonceId) {
  const annonceElement = document.getElementById(`annonce-${annonceId}`);
  if (!annonceElement) {
    console.error(`Element with ID annonce-${annonceId} not found`);
    return;
  }

  const titreElement = annonceElement.querySelector("h2");
  const descriptionElement = annonceElement.querySelector("p");
  const prixElement = annonceElement.querySelectorAll("p")[1];

  if (!titreElement || !descriptionElement || !prixElement) {
    console.error("One or more elements not found");
    return;
  }

  const titre = titreElement.innerText;
  const description = descriptionElement.innerText;
  const prix = prixElement.innerText; // Utilisation de regex pour extraire le nombre

  annonceElement.innerHTML = `
    <input type="text" id="edit-titre-${annonceId}" value="${titre}">
    <textarea id="edit-description-${annonceId}">${description}</textarea>
    <input type="number" id="edit-prix-${annonceId}" value="${prix}">
    <button onclick="saveAnnonce(${annonceId})">Enregistrer</button>
    <button onclick="cancelEdit(${annonceId})">Annuler</button>
  `;
}

function saveAnnonce(annonceId) {
  const titreElement = document.getElementById(`edit-titre-${annonceId}`);
  const descriptionElement = document.getElementById(
    `edit-description-${annonceId}`
  );
  const prixElement = document.getElementById(`edit-prix-${annonceId}`);

  if (!titreElement || !descriptionElement || !prixElement) {
    console.error("One or more elements not found");
    return;
  }
  if (
    titreElement.tagName === "INPUT" &&
    descriptionElement.tagName === "TEXTAREA" &&
    prixElement.tagName === "INPUT"
  ) {
    const titre = titreElement.value;
    const description = descriptionElement.value;
    const prix = parseFloat(prixElement.value); // Conversion en nombre if (isNaN(prix)) { alert("Le champ prix doit être un nombre valide"); return; }

    fetch(`/annonces/edit/${annonceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.split("token=")[1]}`,
      },
      body: JSON.stringify({ titre, description, prix }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Annonce modifiée");
          window.location.reload();
        } else {
          alert("Erreur lors de la modification de l'annonce");
        }
      })
      .catch((error) => {
        console.error("Error editing annonce:", error);
        alert("Erreur lors de la modification de l'annonce");
      });
  } else {
    console.error("One or more elements are not of the expected type");
  }
}

function cancelEdit(annonceId) {
  window.location.reload();
}

function deleteAnnonce(annonceId) {
  fetch(`/annonces/delete/${annonceId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${document.cookie.split("token=")[1]}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Annonce supprimée");
        const annonceElement = document.getElementById(`annonce-${annonceId}`);
        if (annonceElement) {
          annonceElement.remove();
        } else {
          console.error(`Element with ID annonce-${annonceId} not found`);
        }
      } else {
        alert("Erreur lors de la suppression de l'annonce");
      }
    })
    .catch((error) => {
      console.error("Error deleting annonce:", error);
      alert("Erreur lors de la suppression de l'annonce");
    });
}

function removeFavorite(annonceId) {
  fetch(`/favorites/remove/${annonceId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${document.cookie.split("token=")[1]}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Favori supprimé");
        const favoriElement = document.getElementById(`favori-${annonceId}`);
        if (favoriElement) {
          favoriElement.remove();
        } else {
          console.error(`Element with ID favori-${annonceId} not found`);
        }
      } else {
        alert("Erreur lors de la suppression du favori");
      }
    })
    .catch((error) => {
      console.error("Error removing favorite:", error);
      alert("Erreur lors de la suppression du favori");
    });
}
