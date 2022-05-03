import { checkCookies, getCookies, setCookies } from 'cookies-next';

const modelsMissions = require('../../../../../models/modelsMission');

export default async function (req,res) {
  if (req.method === 'GET') {
    modelsMissions.verifierMission()
    .then(response => {
      for (let i = 0; i < response.length; i++) {
        modelsMissions.supprimerMission(response[i].id_mission)
      }
    })
    return new Promise((resolve,reject) => {
      let { id } = req.query
        modelsMissions.getMission(id)
        .then(response => {
          res.json(response)
        })
        .catch(error => {
          res.json(error);
          res.status(405).end();
          resolve();
        });
    })
  }
}