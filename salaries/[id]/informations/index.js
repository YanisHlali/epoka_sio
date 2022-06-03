const modelsMission = require('../../../../../models/modelsMission')

export default async function(req,res) {
    return new Promise((resolve,reject) => {
        modelsMission.getMissionBySalarie(3)
        .then(result => {
            resolve(result);
        })
    })
}