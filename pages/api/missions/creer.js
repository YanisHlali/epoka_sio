import modelsAgences from '../../../models/modelsAgences';

const modelsMissions = require('../../../models/modelsMission');
const modelsCommunes = require('../../../models/modelsCommunes');
const modelsSalaries = require('../../../models/modelsSalaries');
const modelsDistances = require('../../../models/modelsDistances');

async function recupererCommuneJournaliste(idJournaliste) {
    return new Promise((resolve,reject) => {
        modelsSalaries.getSalarie(idJournaliste)
        .then((result) => {
            console.log("Result : "+result)
            modelsAgences.getAgence(result[0].idAgence)
            .then((result2) => {
                console.log("Result2 : "+result2)
                modelsCommunes.getCommuneById(result2[0].idCommune)
                .then((result3) => {
                    console.log("Result3 : "+result3)
                    resolve(result3[0].nom_commune);
                })
            })
        })
    });
}

export default async function(req,res) {
    return new Promise((resolve,reject) => {
    const { debut, fin, idJournaliste, commune } = req.body
    let communeDepart = recupererCommuneJournaliste(idJournaliste)
    modelsCommunes.getCommuneByName(commune)
    .then((result) => {
        let idCommune = result[0].id_commune;
        modelsMissions.creerMission(debut,fin,idJournaliste,idCommune)
        .then((result) => {
            res.json(result)
        })
        .catch(error => {
            res.json(error); 
            res.status(405).end();
            resolve();
            });
        })
        modelsDistances.getDistance(communeDepart,commune)
        .then((result) => {
            if (result != "") {
                modelsDistances.creerDistance(communeDepart,commune,result[0].distanceKm)
            }
        })
    })
}