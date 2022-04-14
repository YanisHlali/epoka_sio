const modelsMission = require('../../../../models/modelsMission')

export default async function(req, res) {
  return new Promise((resolve, reject) => {
    const { id } = req.query
    modelsMission.supprimerMission(id)
  });
};