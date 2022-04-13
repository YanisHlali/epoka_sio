import Menu from "../../components/menu";
import Head from "next/head"

function convertirDate(date) {
  let lesDates = date.split(/\//)
  let dateARetourner = [lesDates[1], lesDates[0], lesDates[2] ].join('/')
  return new Date(dateARetourner)
}

function calculerPrixMission(dateDebut,dateFin,hebergement_forfait,distance_mission,distance_forfait) {
  dateDebut = convertirDate(dateDebut)
  dateFin = convertirDate(dateFin)
  let duree = dateFin.getTime() - dateDebut.getTime()
  duree = new Date(duree)
  let prix = hebergement_forfait * duree.getDate() + distance_mission*distance_forfait
  return prix
}

async function validerMission(idMission) {
  const res = await fetch(`http://localhost:3000/api/missions/${idMission}/valider`);
  const data = await res.json();
}

function Valider({ data}) {

  let missions = data.map((e, index) => {
    return (
      <>
        <p>{e.prenom_salarie} {e.nom_salarie}</p>
        <p>{e.debut_mission} - {e.fin_mission}</p>
        <p>{e.nom_commune_2} - {e.nom_commune_1}</p>
      </>
    )
  }, this)

  let validation = data.map((e, index) => {
    let id = e.id_mission
    let lienValider = `/missions/${e.id_mission}/valider`
    let lienAnnuler = `/missions/${e.id_mission}/annuler`
    if (e.estValider_mission == 0) {
      return (
        <>
          <p key="valider" className="button" id="valider"><a key="v" id={e.id_mission} onClick={validerMission(id)}>Valider</a></p>
          <p key="annuler" className="button" id="annuler"><a key="a" id={e.id_mission} href={lienAnnuler}>Annuler</a></p>
        </>
      )
    } else {
      return (
        <p>Validée</p>
      ) 
    }
  }, this)

  let div = data.map((e, index) => {
    return (
      <>
      <br />
      <div className="missions">
        {missions[index]} {validation[index]}
      </div>
      </>
    )}, this)

  return (
    <>
    <Head>
      <link rel="stylesheet" href="../../styles/missions.css" />
    </Head>
    <Menu />
    <div className="titre">
      <h1>Les missions à valider</h1>
    </div>
    {div}
    </>
  )
}

export const getStaticProps = async () => {
  const res = await fetch('http://localhost:3001/api/missions/valider');
  const data = await res.json();


  return {
    props: { data: data }
  }
}


export default Valider;