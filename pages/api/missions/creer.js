const modelsMission = require('../../../models/modelsMission');

export default async function(req,res) {
    return new Promise((resolve,reject) => {
    const { debut, fin, idJournaliste, commune } = req.body
    modelsMission.creerMission(debut, fin, idJournaliste, commune)
        .then((result) => {
            res.json(result)
        })
        .catch(error => {
            res.json(error); 
            res.status(405).end();
            resolve();
          });
    })
}