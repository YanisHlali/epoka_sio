import { query } from './models';

async function getAgence(idAgence) {
    return new Promise((resolve,reject) => {
        query(`SELECT * FROM agences WHERE id_agence=${idAgence}`, (err,result) => {
            if (err) throw err;
            resolve(result)
        });
    })
};

export default {
    getAgence
}