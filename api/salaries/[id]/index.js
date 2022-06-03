const modelsSalaries = require('../../../../models/modelsSalaries')

export default async function(req,res) {
    return new Promise((resolve,reject) => {
    const { id } = req.query
    modelsSalaries.getSalarie(id)
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