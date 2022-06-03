const modelsForfait = require('../../models/modelsForfait')

export default async function(req, res) {
  return new Promise((resolve, reject) => {
      if (req.method === "POST") {
        const { distance, hebergement } = req.body
        modelsForfait.updateForfait(distance, hebergement)
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