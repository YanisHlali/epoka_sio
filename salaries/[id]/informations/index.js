const modelsMission = require('../../../../../models/modelsMission')
const db = require('../../../../../models/models')

export default async function(req,res) {
    return new Promise((resolve,reject) => {
        db.query(`SELECT * FROM missions,communes,salaries
        WHERE missions.idJournaliste_mission=salaries.id_salarie AND
        missions.idCommune_mission=communes.id_commune AND
        id_salarie=${3} AND NOW()-fin_mission < 90`, (err,result) => {
            if (err) throw err;
            resolve(result);
        });
    })
}