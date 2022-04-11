const db = require('./models')

async function creerDistance(commune_une,commune_deux,distanceKm) {
    db.query(`INSERT INTO distances (communeUn_distance,communeDeux_distance,distanceKm) VALUES (${commune_une},${commune_deux},${distanceKm})`, (err,result) => {
        if (err) throw err;
    });
};

async function afficherDistance() {
    return new Promise((resolve,reject) => {
        db.query(`SELECT nom_commune FROM communes`, (err,result) => {
            if (err) throw err;
            resolve(result);
        });
    });
};

async function modifierDistance(id_mission,distance) {
    db.query(`UPDATE missions SET distance_mission=${distance} WHERE id_mission=${id_mission}`, (err, result) => {
        if (err) throw err;
    });
};

async function creerDistanceAuto() {
    db.query(`SELECT c2.nom_commune as commune_depart, c1.nom_commune as commune_arrivee FROM missions,salaries,communes c1, communes c2,agences WHERE distance_mission IS NULL
    AND missions.idCommune_mission=c1.id_commune
    AND missions.idJournaliste_mission=salaries.id_salarie
    AND salaries.idAgence=agences.id_agence
    AND agences.idCommune_agence=c2.id_commune`, (err,result) => {
        if (err) throw err;
        db.query(`SELECT * FROM distances WHERE communeUn_distance"=${result[0].commune_arrivee}" AND
        communeDeux_distance="${result[0].commune_depart}" OR communeUn_distance="${result[0].commune_depart}" AND
        communeDeux_distance="${result[0].commune_arrivee}"`, (err,result2) => {
            console.log(result2)
            // creerDistance(result[0].commune_arrivee,result[0].commune_depart,result2[0].distanceKm);
            // db.query(`UPDATE missions SET distance_mission=${result2[0].distanceKm} WHERE id_mission=${result[0].id_mission}`, (err,result) => {
            //     if (err) throw err;
            // })
        })
    });
}

module.exports = {
    creerDistance,
    afficherDistance,
    modifierDistance,
    creerDistanceAuto
}