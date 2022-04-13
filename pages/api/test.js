const modelsDistance = require('../../models/modelsDistances')

export default async function (req,res) {
    return new Promise((resolve,reject) => {
        modelsDistance.afficherDistance()
            .then((response) => {
                res.send("Oui")
            })
            .catch((error) => {
                res.send("error")
            })
    })
}