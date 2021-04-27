import dbConnect from '../../../util/dbConnect';
import User from '../../../models/users';

dbConnect();

//find all trade posts and filter out users own posts client side
export default async (req,res) => {
    const {method} = req;
    const {username} = req.query;
    if (method==='GET') {
        try {
            let result = await User.findOne({username: username});
            res.status(200).send(result)
        } catch (err) {
            console.error(`Couldn't find information on ${username}.`, err);
            res.status(500).send(err);
        }
    } else {
        res.status(404).send("Method does not exist");
    }
}