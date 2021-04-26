import dbConnect from '../../util/dbConnect';
import User from '../../models/users';

dbConnect();

//find all trade posts and filter out users own posts client side
export default async (req,res) => {
    const {method} = req;
    if (method==='POST') {
        try {
            console.log("REQ:", req.body)
            let result = await User.find({location: {$geoNear: {$maxDistance: 10000, $geometry: {type: "Point", coordinates: req.body.location}}}});
            //console.log('RESULT find trades: ',result)
            let tradesArr = result.map((user) => user.trades);
            let trades = tradesArr.flat();
            console.log("TRADES", trades); 
            res.status(200).send(trades)
        } catch (err) {
            console.error("Couldn't find all trades", err);
            res.status(500).send(err);
        }
    } else {
        res.status(404).send("Method does not exist");
    }
}