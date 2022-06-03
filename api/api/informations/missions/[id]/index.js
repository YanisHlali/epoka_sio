const modelsMission = require('../../../../../models/modelsMission')

export default async function(req,res) {
    return new Promise((resolve,reject) => {
        modelsMission.getMission(1)
        .then(result => {
            res.json(result);
        })
    });
}