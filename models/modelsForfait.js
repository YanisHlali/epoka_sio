const db = require('./models').default

async function getForfait() {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM forfait`, (err,result) => {
            if (err) throw err
            resolve(result)
        })
    })
}

async function updateForfait(distance,hebergement) {
    db.query(`UPDATE forfait SET distance_forfait=${distance}, hebergement_forfait=${hebergement}`, (err,result) => {
        if (err) throw err
    })
}

module.exports = {
    getForfait,
    updateForfait
}