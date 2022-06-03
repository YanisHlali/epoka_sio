const modelsDistance = require('../../models/modelsDistances')
const modelsCommune = require('../../models/modelsCommunes')

export default async function(req, res) {
  return new Promise((resolve, reject) => {
    if (req.method === 'GET') {
        modelsDistance.afficherDistance()
        .then(response => {
          res.json(response);
        })
        .catch(error => {
          res.json(error); 
          res.status(405).end();
          resolve(); // in case something goes wrong in the catch block (as vijay commented)
        });
    } else {
        let { commune_1, commune_2, distance } = req.body
        modelsCommune.getCommune(commune_1,commune_2)
        .then((value1) => {
            modelsDistance.creerDistance(value1[0].id_commune,value1[1].id_commune,distance)
            modelsCommune.getCommuneMission(value1[0].nom_commune,value1[1].nom_commune)
            .then((result) => {
                if (result != "") modelsDistance.modifierDistance(result[0].id_mission,distance)
            }).catch((error) => {
                console.error(error);
            })
        })
    }
  });
};