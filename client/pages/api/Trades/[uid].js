import dbConnect from '../../../util/dbConnect';
import User from '../../../models/users'

dbConnect();

 export default async (req,res) => {
     const {method} = req;
     const {uid} = req.query;
     console.log("REQUEST: ", req.body );
     
     switch(method) {
       // by user uid, add a new Inspo and update numInspos
       case 'POST':
            req.body = JSON.parse(req.body)
            const newTrade = {
              tradeId: req.body.tradeId,
              uid: uid,
              username: req.body.username,
              title: req.body.title,
              description: req.body.description,
              images: req.body.images,
              location: {type: 'Point', coordinates: req.body.location},
              city: req.body.city,
              country: req.body.country,
              minOffer: req.body.minOffer,
              tradePreference: req.body.tradePreference,
              trade: req.body.trade,
              sell: req.body.sell
            }
            try {
              // const user = await User.findOne({uid:uid})
              // console.log("USER",user)
              await User.updateOne({uid},{$push: {trades: newTrade}});
              const result = await User.findOneAndUpdate({uid},{$inc: {numTrades:1}},{new:true});
              //const newNum = user.numTrades + 1;
              //const result = await User.findOneAndUpdate({uid},{trades:update, numTrades:newNum},{new:true});
              console.log("POST TRADE: ", result)
              res.status(201).send(result)
            } catch(err) {
              console.error(`Couldn't add new trade ${uid}`,err)
              res.status(500).send(err);
            }
            break;
          //update likes,updated
          case 'PUT':
            try {
            //likes is given by 1 or -1 for decrement or increment by Trade id
              let {id, likes} = req.body;
              const user = await User.findOne({uid:uid});
              const update = user.trades.map((trade)=>{
                    if (trade._id===id) {
                        const newTrade = {
                            ...trade,
                            likes: trade.likes+likes
                        }
                        return newTrade;
                    } else return trade
              })
              const result = await User.findOneAndUpdate({uid},{trades:update, updated:Date.now()},{new:true});
              res.status(200).send(result);
            } catch (err) {
              console.error(`Couldn't update trades: ${uid}`, err);
              res.status(500).send(err);
            }
            break;
          //remove trade by id in req.body
          case 'DELETE':
            try {
              const {id} = req.body.id
              const user = await User.findOne({uid:uid});
              const update = user.trades.filter((trade)=> trade._id!=id);
              await User.findOneAndUpdate({uid},{trades:update},{new:true});
              res.status(204).send();
            } catch (err) {
              console.error(`Couldn't remove trade: ${uid}`, err);
              res.status(500).send(err);
            }
            break;
    }
}