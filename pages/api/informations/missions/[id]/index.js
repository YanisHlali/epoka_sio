const modelsMission = require('../../../../../models/modelsMission')

export default async function(req,res) {
    return new Promise((resolve,reject) => {
        modelsMission.getMissions(req.query.id)
        .then(result => {
            res.json(result)
        })
    });
}