const db = require('./models')

async function getSalarie(id) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM salaries WHERE id_salarie=${id}`,(err,result) => {
            if (err) throw err
            resolve(result)
        })
    })
}

async function checkSalarie(nom,prenom,motdepasse) {
    // return new Promise((resolve,reject) => {
    //         db.query(`SELECT * FROM salaries WHERE nom_salarie='${nom}' AND prenom_salarie='${prenom}' AND motdepasse_salarie='${motdepasse}'`, (err,result) => {
    //         if (err) throw err
    //         resolve(result)
    //     })
    // })
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM salaries`, (err,result) => {
            if (err) reject(err)
            console.log(result)
            resolve(result);
        });
    });
}


module.exports = {
    getSalarie,
    checkSalarie
}