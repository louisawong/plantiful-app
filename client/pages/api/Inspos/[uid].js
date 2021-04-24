import dbConnect from '../../../util/dbConnect';
import User from '../../../models/users'

dbConnect();

 export default async (req,res) => {
     const {method} = req;
     const {uid} = req.query;
     console.log(uid);

    switch(method) {
         // by user uid, add a new Inspo and update numInspos
          case 'POST':
            const inspo = {
              _id: req.body.id,
              userId: uid,
              username: req.body.username,
              title: req.body.title,
              caption: req.body.caption,
              images: req.body.images
            }
            try {
              const user = await User.findOne({uid:uid})
              const update = user.inspos.push(inspo);
              const newNum = user.numInspos + 1;
              const result = await User.findOneAndUpdate({uid},{inspos:update, numInspos:newNum},{new:true});
              res.status(201).send(result)
            } catch(err) {
              console.error(`Couldn't add new inspo ${uid}`,err)
              res.status(500).send(err);
            }
            break;
          //update likes,updated
          case 'PUT':
            try {
            //likes is given by 1 or -1 for decrement or increment by Inspo id
              let {id, likes} = req.body;
              const user = await User.findOne({uid:uid});
              const update = user.inspos.map((inspo)=>{
                    if (inspo._id===id) {
                        const newInspo = {
                            ...inspo,
                            likes: inspo.likes+likes
                        }
                        return newInspo;
                    } else return inspo
              })
              const result = await User.findOneAndUpdate({uid},{inspos:update, updated:Date.now()},{new:true});
              res.status(200).send(result);
            } catch (err) {
              console.error(`Couldn't update inspo: ${uid}`, err);
              res.status(500).send(err);
            }
            break;
          //remove inspo by id in req.body
          case 'DELETE':
            try {
              const {id} = req.body.id
              const user = await User.findOne({uid:uid});
              const update = user.inspos.filter((inspo)=> inspo._id!=id);
              await User.findOneAndUpdate({uid},{inspos:update},{new:true});
              res.status(204).send();
            } catch (err) {
              console.error(`Couldn't remove inspo: ${uid}`, err);
              res.status(500).send(err);
            }
            break;
    }
}