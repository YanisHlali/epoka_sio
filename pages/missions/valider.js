import Menu from "../../components/menu";
import Head from "next/head"
import cookie from "js-cookie"
import { useState, useEffect } from 'react'

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
  const res = await fetch(`https://new-epoka.vercel.app/api/missions/${idMission}/valider`);
  const data = await res.json();

  console.log(data)
}

async function annulerMission(idMission) {
  const res = await fetch(`https://new-epoka.vercel.app/api/missions/${idMission}/annuler`);
  const data = await res.json();

  console.log(data);
}

function Valider({ data, role }) {

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
    if (e.estValider_mission == 0) {
      return (
        <>
          <p key="valider" className="button" id="valider"><a key="v" id={e.id_mission} onClick={() => {
            validerMission(id)
            window.location.href="https://new-epoka.vercel.app/missions/valider"
          }}>Valider</a></p>
          <p key="annuler" className="button" id="annuler"><a key="a" id={e.id_mission} onClick={() => {
            annulerMission(id)
            window.location.href="https://new-epoka.vercel.app/missions/valider"
          }} >Annuler</a></p>
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
    )}, this);

  let h1 = <h1>Les missions à valider</h1>;
  if (data == "") h1 = <h1>Aucune mission à valider</h1>



  if (role == "responsable") {
    return (
      <>
      <Head>
        <link rel="stylesheet" href="../../styles/missions.css" />
      </Head>
      <Menu />
      <div className="titre">
        {h1}
      </div>
      {div}
      </>
    )
  } else {
    return (
      <>
        <Head>
          <link rel="stylesheet" href="../../styles/missions.css" />
          <link rel="stylesheet" href="../../styles/erreur.css" />
        </Head>
        <Menu />
        <div className="droitRefuse">
          <p>Vous n'avez pas les droits</p>
        </div>
      </>
    )
  }
}

export async function getServerSideProps({req,res}) {
  const response = await fetch('http://new-epoka.vercel.app/api/missions/valider');
  const data = await response.json();

  return {
    props: { data: data, role: req.cookies.userRole }
  }
}


export default Valider; 