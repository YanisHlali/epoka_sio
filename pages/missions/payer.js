import Menu from "../../components/menu";
import Head from "next/head"
import { getCookie } from "cookies-next";

function convertirDate(date) {
  let lesDates = date.split(/\//)
  let dateARetourner = [lesDates[1], lesDates[0], lesDates[2] ].join('/')
  return new Date(dateARetourner)
}

function calculerPrixMission(dateDebut,dateFin,hebergement_forfait,distance_mission,distance_forfait) {
  dateDebut = convertirDate(dateDebut)
  dateFin = convertirDate(dateFin)
  let duree = dateFin.getTime() - dateDebut.getTime()
  let newDuree = new Date(duree)
  let prix = hebergement_forfait * newDuree.getDate() + distance_mission*distance_forfait
  return prix
}

async function payerMission(idMission) {
  const res = await fetch(`https://new-epoka.vercel.app/api/missions/${idMission}/payer`);
  const data = await res.json();

  console.log(data);
}

async function annulerMission(idMission) {
  const res = await fetch(`http://new-epoka.vercel.app/api/missions/${idMission}/annuler`);
  const data = await res.json();

  console.log(data);
}

function Payer({ data }) {
  if (data.length == undefined) {
    return (
      <>
      <Head>
        <link rel="stylesheet" href="../styles/missions.css" />
      </Head>
      <Menu />
      <div className="titre">
        <h1>Les missions à payer</h1>
      </div>
      </>
    )
  } else {
    let prix = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].distance_mission != null) {
        prix.push(calculerPrixMission(
          data[i].debut_mission,
          data[i].fin_mission,
          data[i].hebergement_forfait,
          data[i].distance_mission,
          data[i].distance_forfait) + " €")
      } else {
        prix.push("Non dispo.")
      }
    }

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
      let id = e.id_mission;
      if (e.estPayer_mission == 0) {
        return (
          <>
            <p key="payer" className="button" id="valider"><a key="v" id={e.id_mission} onClick={() => {
              payerMission(id)
              window.location.href = "http://new-epoka.vercel.app/missions/payer"
            }}>Payer</a></p>
            <p key="annuler" className="button" id="annuler"><a key="a" id={e.id_mission} onClick={() => {
              annulerMission(id)
              window.location.href="http://new-epoka.vercel.app/missions/payer"
            }}>Annuler</a></p>
          </>
        )
      } else {
        return (
          <p>Payée</p>
        ) 
      }
    }, this)

    let div = data.map((e, index) => {
      return (
        <>
        <br />
        <div className="missions">
          {missions[index]} <p>{prix[index]}</p> {validation[index]} 
        </div>
        </>
      )}, this);

      let h1 = <h1>Les missions à payer</h1>;
      if (data == "") h1 = <h1>Aucune mission à payer</h1>

    return (
      <>
      <Head>
        <link rel="stylesheet" href="../styles/missions.css" />
      </Head>
      <Menu />
      <div className="titre">
        {h1}
      </div>
      {div}
      </>
    )
  }
}

export const getStaticProps = async () => {
  const res = await fetch('http://new-epoka.vercel.app/api/missions/payer');
  const data = await res.json();
  if (data != "" || data != null || data.length != undefined) {
    return {
      props: { data: data }
    }
  } else {
    return {
      props: { data: "test" }
    }
  }
}


export default Payer;