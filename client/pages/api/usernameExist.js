import dbConnect from '../../util/dbConnect';
import User from '../../models/users';

dbConnect();

//find if userName is taken
export default async (req,res) => {
    const {method} = req;
    console.log("METHOD:" , method)
    console.log("REQ", req.body)
    if (method==='POST') {
        try {
            let result = await User.find({username:req.body.username});
            if (result.length) res.status(200).send(result);
            res.status(204).send();
        } catch (err) {
            console.error("Couldn't find the username", err);
            res.status(500).send(err);
        }
    } else {
        res.status(404).send("Method does not exist");
    }
}