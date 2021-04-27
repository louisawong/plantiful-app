import dbConnect from '../../util/dbConnect';
import User from '../../models/users';

dbConnect();

//find all trade posts and filter out users own posts client side
export default async (req,res) => {
    const {method} = req;
    console.log("REQ",req.body)
    if (method==='POST') {
        try {
            const inspoId = req.body.inspoId
            const uid = req.body.uid
            const user = await User.findOne({uid:uid});
            const update = user.inspos.filter((inspo)=> inspo.inspoId!==inspoId);
            const newInpos = await User.findOneAndUpdate({uid},{$inc: {numInspos:-1}, inspos:update},{new:true});
            res.status(200).send(newInspos);
          } catch (err) {
            console.error(`Couldn't remove inspo: ${uid}`, err);
            res.status(500).send(err);
          }
    } else {
        res.status(404).send("Method does not exist");
    }
}