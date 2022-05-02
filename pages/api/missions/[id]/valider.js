const modelsMission = require('../../../../models/modelsMission')

export default async function(req, res) {
  return new Promise((resolve, reject) => {
    const { id } = req.query
    modelsMission.validerMission(id)
    .then((result) => {
      res.json(result);
    });
  });
};