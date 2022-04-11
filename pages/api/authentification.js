const modelsSalaries = require('../../models/modelsSalaries')

// export default function handler(req,res) {
//     const { nom, prenom, motdepasse } = req.body
//     modelsSalaries.checkSalarie(nom,prenom,motdepasse)
//     .then(result => { return res.status(200).json(result) })
//     .catch(err => console.error(err))
//     modelsSalaries.checkSalarie(nom,prenom,motdepasse)
//     .then((err,value) => {
//         if (err) throw err;
//         console.log(value)
//         if (value != "") {
//             return res.status(200).json({ data : value })
//         } else {
//             return res.status(200).json({ data : "" })
//         }
//     })
// }

export default async function(req, res) {
  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
    const { nom, prenom, motdepasse } = req.body
    modelsSalaries.checkSalarie(nom,prenom,motdepasse)
      .then(response => {
        // res.json(response)
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=180000');
        res.end(JSON.stringify(response));
        resolve();
      })
      .catch(error => {
        res.json(error); 
        res.status(405).end();
        resolve(); // in case something goes wrong in the catch block (as vijay commented)
      });
    }
  });
};