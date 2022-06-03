const modelsSalaries = require('../../models/modelsSalaries')

export default async function(req, res) {
  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
    const { nom, prenom, motdepasse } = req.body
    modelsSalaries.checkSalarie(nom,prenom,motdepasse)
      .then(response => {
        res.json(response)
      })
      .catch(error => {
        res.json(error); 
        res.status(405).end();
        resolve();
      });
    }
  });
};