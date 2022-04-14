const modelsMissions = require('../../../models/modelsMission');
const modelsCommune = require('../../../models/modelsCommune');

export default async function(req,res) {
    return new Promise((resolve,reject) => {
    const { debut, fin, idJournaliste, commune } = req.body
    modelsCommune.getCommuneByName(commune)
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
    })
}