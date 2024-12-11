// Fonction pour récupérer le token à partir de la session
async function getToken() {
  try {
    const response = await fetch(`${window.location.origin}/get-token`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Token:", data.token);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

// Appeler la fonction pour récupérer le token
getToken();

function createAnnonceView() {
  return `
    <form action="/annonces/createAnnonce" method="POST">
      <label for="titre">Titre:</label>
      <input type="text" id="titre" name="titre" required><br>
      <label for="description">Description:</label>
      <textarea id="description" name="description" required></textarea><br>
      <label for="prix">Prix:</label>
      <input type="number" id="prix" name="prix" required><br>
      <button type="submit">Créer l'annonce</button>
    </form>
  `;
}

module.exports = createAnnonceView;
