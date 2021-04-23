import dbConnect from '../../util/dbConnect';
import User from '../../models/users';

dbConnect();

//find all trade posts and filter out users own posts client side
export default async (req,res) => {
    const {method} = req.method;
    if (method==='GET') {
        try {
            let result = await User.find();
            let tradesArr = result.map((user) => user.inspos);
            let trades = tradesArr.flat();
            console.log(trades); 
            res.status(200).send(trades)
        } catch (err) {
            console.error("Couldn't find all trades", err);
            res.status(500).send(err);
        }
    } else {
        res.status(404).send("Method does not exist");
    }
}