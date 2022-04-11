const modelsMission = require('../../../../models/modelsMission')
import { useRouter } from "next/router"

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
    const { id } = req.query
    modelsMission.validerMission(id)
  });
};

// const User = () => {
//   const router = useRouter()
//   const { id } = router.query
//   console.log(id)
// }

// export default User;