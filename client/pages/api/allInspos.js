import dbConnect from '../../util/dbConnect';
import User from '../../models/users';

dbConnect();

//find all inspo posts and filter out users own posts client side
export default async (req,res) => {
    const {method} = req;
    if (method==='GET') {
        try {
            //console.log("REQ:", req.body)
            let result = await User.find();
            let insposArr = result.map((user) => user.inspos);
            let inspos = insposArr.flat();
            res.status(200).send(inspos)
        } catch (err) {
            console.error("Couldn't find all inspos", err);
            res.status(500).send(err);
        }
    } else {
        res.status(404).send("Method does not exist");
    }
}