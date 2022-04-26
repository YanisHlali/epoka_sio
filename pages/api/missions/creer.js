import modelsAgences from '../../../models/modelsAgences';

const modelsMissions = require('../../../models/modelsMission');
const modelsCommunes = require('../../../models/modelsCommunes');
const modelsSalaries = require('../../../models/modelsSalaries');
const modelsDistances = require('../../../models/modelsDistances');


export default async function(req,res) {
    return new Promise((resolve,reject) => {
    // const { debut, fin, idJournaliste, commune } = req.body
    let debut = "16/04/2022";
    let fin = "16/04/2022";
    let idJournaliste = "3";
    let commune = "Grenoble";
    let communeDepart = recupererCommuneJournaliste(idJournaliste)
    console.log(communeDepart);

    modelsCommunes.getCommuneByName(commune)
    .then((result) => {
        let idCommune = result[0].id_commune;
        modelsMissions.creerMission(debut,fin,idJournaliste,idCommune)
        .then((result) => {
            res.json(result)
            // modelsDistances.getDistance(communeDepart,commune)
            // .then((result2) => {
            //     if (result2 != "") {
            //         modelsDistances.creerDistance(communeDepart,commune,result[0].distanceKm)
            //     }
            // })
        })
        .catch(error => {
            res.json(error); 
            res.status(405).end();
            resolve();
            });
        })
    })
}