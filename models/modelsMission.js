const db = require('./models')

let requete = `SELECT 
id_mission,
debut_mission,
fin_mission,
distance_mission,
status_mission,
estValider_mission,
estPayer_mission,
idJournaliste_mission,
idCommune_mission,
id_salarie,
nom_salarie,
prenom_salarie,
motdepasse_salarie,
estJournaliste_salarie,
estComptable_salarie,
estResponsable_salarie,
idResponsable,
idAgence,
id_agence,
nom_agence,
adresse_agence,
idCommune_agence,
distance_forfait,
hebergement_forfait,
c1.nom_commune as nom_commune_1,
c2.nom_commune as nom_commune_2 FROM 
missions,salaries,communes c1,agences,communes c2,forfait WHERE 
salaries.id_salarie=missions.idJournaliste_mission AND
missions.idCommune_mission=c1.id_commune AND
agences.idCommune_agence=c2.id_commune AND
agences.id_agence=salaries.idAgence AND `;
// `estValider_mission=1 AND status_mission="En cours..."`


async function creerMission(debut,fin,idJournaliste,commune) {
    return new Promise((resolve,reject) => {
        db.query(`INSERT INTO missions (debut_mission,fin_mission,status_mission,estValider_mission,estPayer_mission,
        idJournaliste_mission,idCommune_mission) VALUES ("${debut}","${fin}","En attente...",0,0,${idJournaliste},${commune})`, (err,result) => {
            if (err) throw err;
            resolve(result);
        })
    })
}

async function getMission(idResponsable) {
    return new Promise((resolve,reject) => {
        db.query(requete + `idResponsable=${idResponsable}`, (err,result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

async function getMissionValider(idResponsable) {
    return new Promise ((resolve,reject) => {
        db.query(requete + `idResponsable=${idResponsable} AND status_mission="En attente..."`, (err,result) => {
            if (err) throw err;
            resolve(result);
        });
    });
};

async function getMissionPayer(idResponsable) {
    return new Promise((resolve,reject) => {
        db.query(requete + `estValider_mission=1 AND idResponsable=${idResponsable}` , (err,result) => {
            if (err) throw err;
            resolve(result);
        });
    });
};

async function validerMission(id_mission) {
    db.query(`UPDATE missions SET estValider_mission=1,status_mission="En cours..." WHERE id_mission=${id_mission}`, (err,result) => {
        if (err) throw err;
    });
};

async function payerMission(id_mission)  {
    db.query(`UPDATE missions SET estPayer_mission=1 WHERE id_mission=${id_mission}`, (err,result) => {
        if (err) throw err;
    });
};

async function supprimerMission(id_mission) {
    db.query(`DELETE FROM missions WHERE id_mission=${id_mission}`, (err,result) => {
        if (err) throw err;
    });
};

function recupererDateJour() {
    let aujourdhui = new Date();
    // Récupération du jour
    let jour = aujourdhui.getDate() < 10 ? "0" + aujourdhui.getDate() : aujourdhui.getDate();
    // Récupération du mois
    let mois = aujourdhui.getMonth() < 10 ? "0" + (aujourdhui.getMonth()+1) : aujourdhui.getMonth()+1;
    // Récupération de l'année
    let annee = aujourdhui.getFullYear();
    let aujourDaujourdhui = jour + "/" + mois + "/" + annee;
    return aujourDaujourdhui;
}

async function verifierMission() {
    let date = recupererDateJour()
    return new Promise((resolve,reject) => {
        db.query(`SELECT id_mission,fin_mission FROM missions WHERE fin_mission < "${date}"`, (err,result) => {
            if (err) throw err;
            resolve(result);
        });
    });
};

async function finirMission(id_mission) {
    db.query(`UPDATE missions SET status_mission="Terminé" WHERE id_mission=${id_mission}`, (err,result) => {
        if (err) throw err;
    });
};




module.exports =  {
    creerMission,
    getMission,
    getMissionValider,
    getMissionPayer,
    validerMission,
    payerMission,
    supprimerMission,
    verifierMission,
    finirMission
}