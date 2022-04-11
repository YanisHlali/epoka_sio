const modelsMission = require('../../../../models/modelsMission')
import { useRouter } from "next/router"

export default async function(req, res) {
  return new Promise((resolve, reject) => {
    const { id } = req.query
    modelsMission.payerMission(id)
  });
};

// const User = () => {
//   const router = useRouter()
//   const { id } = router.query
//   console.log(id)
// }

// export default User;