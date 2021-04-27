import dbConnect from '../../util/dbConnect';
import User from '../../models/users';

dbConnect();

//find all trade posts and filter out users own posts client side
export default async (req,res) => {
    const {method} = req;
    //console.log("REQ",req.body)
    if (method==='POST') {
        try {
            const tradeId = req.body.tradeId
            const uid = req.body.uid
            const user = await User.findOne({uid:uid});
            const update = user.trades.filter((trade)=> trade.tradeId!==tradeId);
            const newTrades = await User.findOneAndUpdate({uid},{trades:update},{new:true});
            res.status(200).send(newTrades);
          } catch (err) {
            console.error(`Couldn't remove trade: ${uid}`, err);
            res.status(500).send(err);
          }
    } else {
        res.status(404).send("Method does not exist");
    }
}