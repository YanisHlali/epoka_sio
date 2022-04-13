const modelsCommunes = require('../../../../models/modelsCommunes')

export default async function(req,res) {
    return new Promise((resolve,reject) => {
    const { name } = req.query
    modelsCommunes.getCommuneByName(name)
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