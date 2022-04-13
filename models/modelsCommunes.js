const db = require('./models')

async function getCommune(commune_une,commune_deux) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM communes WHERE nom_commune="${commune_une}" OR nom_commune="${commune_deux}"`, (err,result) => {
            if (err) throw err;
            resolve(result);
        });
    });
};

async function getCommuneById(id) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM communes WHERE id_commune=${id}`, (err,result) => {
            if (err) throw err;
            resolve(result);
        });
    });
};

async function getCommuneByName(commune) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM communes WHERE nom_commune="${commune}"`, (err,result) => {
            if (err) throw err;
            resolve(result);
        });
    });
}

async function getCommuneMission(commune_1,commune_2) {
    let requete = `SELECT id_mission,c1.nom_commune as commune_arrive,c2.nom_commune as commune_depart
    FROM missions,communes c1,communes c2,salaries,agences
    WHERE missions.idCommune_mission=c1.id_commune AND 
    missions.idJournaliste_mission=salaries.id_salarie AND 
    salaries.idAgence=agences.id_agence AND 
    agences.idCommune_agence=c2.id_commune`
    return new Promise((resolve,reject) => {
        db.query(requete + ` AND c1.nom_commune="${commune_1}" AND c2.nom_commune="${commune_2}"`, (err,result) => {
            if (err) throw err;
            if (result == "") {
                db.query(requete + ` AND c1.nom_commune="${commune_2}" AND c2.nom_commune="${commune_1}"`, (err,result) => {
                    if (err) throw err;
                    resolve(result);
                });
            } else {
                resolve(result);
            }
        });
    });
};


module.exports = {
    getCommune,
    getCommuneById,
    getCommuneByName,
    getCommuneMission
}