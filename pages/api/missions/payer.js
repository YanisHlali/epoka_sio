import { getCookies } from 'cookies-next';

const modelsMissions = require('../../../models/modelsMission');
const modelsSalaries = require('../../../models/modelsSalaries');
const modelsAgences = require('../../../models/modelsSalaries');
const modelsCommunes = require('../../../models/modelsCommunes');
const modelsDistances = require('../../../models/modelsDistances');

export default async function (req,res) {
    return new Promise((resolve,reject) => {
        let idResponsable = 1
        modelsMissions.getMissionPayer(idResponsable)
        .then(response => {
          res.json(response)
          })
          .catch(error => {
            res.json(error);
            res.status(405).end();
            resolve(); // in case something goes wrong in the catch block (as vijay commented)
          });
    })

}