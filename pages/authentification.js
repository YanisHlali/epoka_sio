import { checkCookies, setCookies } from "cookies-next";
import Head from "next/head";
import Menu from "../components/menuAuthentification";

function Formulaire() {
  const handleSubmit = async (event) => {
    // Empêche le formulaire de se soumettre et de rafraîchir la page
    event.preventDefault();
    // Récupère les données du formulaire
    const data = {
      prenom: event.target.prenom.value,
      nom: event.target.nom.value,
      motdepasse: event.target.motdepasse.value,
    };
    // Envoie les données au serveur au format JSON
    const JSONdata = JSON.stringify(data);
    // Lien API où l'on envoie les données
    const endpoint = "/api/authentification";
    // Crée la requête à envoyer au serveur
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    // Envoie la requête au serveur et recupère la réponse
    const response = await fetch(endpoint, options);
    // Résultat de l'API
    const result = await response.json();
    console.log(result)
    if (result) {
      // Si la réponse est différente de vide, on crée les cookies
      setCookies("userId", result[0].id_salarie);
      setCookies("userNom", result[0].nom_salarie);
      setCookies("userMdp", result[0].motdepasse_salarie);
      if (result[0].estJournaliste_salarie == 1) setCookies("userRole", "journaliste");
      if (result[0].estComptable_salarie == 1) setCookies("userRole", "comptable");
      if (result[0].estResponsable_salarie == 1) setCookies("userRole", "responsable");
      // Redirige vers la page d'accueil
      window.location.href = "/accueil";
    }
  };
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles/authentification.css" />
      </Head>
      <Menu />
      <div className="main">
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="authentification"
        >
          <input type="text" name="nom" placeholder="Nom" />
          <br />
          <br />
          <br />
          <input type="text" name="prenom" placeholder="Prénom" />
          <br />
          <br />
          <br />
          <input type="password" name="motdepasse" placeholder="*********" />
          <br />
          <br />
          <br />
          <button className="second" type="submit">
            Envoyer
          </button>
        </form>
      </div>
    </>
  );
}

export default Formulaire;
