const db = require('./models')

async function communes(codePostal,nom) {
    db.query(`INSERT INTO communes (codePostal_commune,nom_commune) VALUES (${codePostal}, '${nom}')`,(err,result) => {
        if (err) throw err
    })
}

async function agences(nom,adresse,idCommune) {
    db.query(`INSERT INTO agences (nom_agence,adresse_agence,idCommune) VALUES ('${nom}','${adresse}',${idCommune})`, (err,result) => {
        if (err) throw err
    })
}

async function forfait(distance,hebergement) {
    db.query(`INSERT INTO forfait (distance_forfait,hebergement_forfait)  VALUES (${distance}, ${hebergement})`, (err,result) => {
        if (err) throw err
    })
}

async function salaries(nom,prenom,motdepasse,estJournaliste,estComptable,estResponsable,idResponsable,idAgence) {
    db.query(`INSERT INTO salaries (nom_salarie,prenom_salarie,motdepasse_salarie,estJournaliste_salarie,estComptable_salarie,estResponsable_salarie,idResponsable,idAgence) VALUES ('${nom}','${prenom}','${motdepasse}',${estJournaliste},${estComptable},${estResponsable},${idResponsable},${idAgence})`
    )
}

async function missions(debut,fin,distance,status,estValider,estPayer,idJournaliste,idCommune,idForfait) {
    db.query(`INSERT INTO missions (debut_mission,fin_mission,distance_mission,status_mission,estValider_mission,estPayer_mission,idJournaliste,idCommune,idForfait) VALUES ('${debut}','${fin}',${distance},'${status}',${estValider},${estPayer}, ${idJournaliste},${idCommune}, ${idForfait})`)
}


module.exports = {
    communes,
    agences,
    forfait,
    salaries,
    missions
}