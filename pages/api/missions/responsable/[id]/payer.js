import { getCookies } from 'cookies-next';

const modelsMissions = require('../../../../../models/modelsMission');

export default async function (req,res) {
    return new Promise((resolve,reject) => {
      let { id } = req.query
      modelsMissions.modifierMissionDistanceAuto()
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.error(error);
      })
        modelsMissions.getMissionPayer(id)
        .then(response => {
          res.json(response)
          })
          .catch(error => {
            res.json(error);
            res.status(405).end();
            resolve(); // in case something goes wrong in the catch block (as vijay commented)
          });
    })

}