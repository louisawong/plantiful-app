import dbConnect from '../../../util/dbConnect';
import User from '../../../models/users'

dbConnect();

 export default async (req,res) => {
     const {method} = req.method;
     const {uid} = req.query;
     console.log(uid);

    switch(method) {
         // by user uid with chat id in req.body to post in new message
          case 'POST':
            const {id, userId, content} = req.body;
            const message = {
              _id: req.body.id,
              userId,
              content,
            }
            try {
              const user = await User.findOne({uid})
              const update = user.chats.map((chat)=>{
                  if(chat._id === id) {
                    return chat.push(message);
                  } else return chat;
              });
              const result = await user.updateOne({chats:update});
              res.status(201).send(result)
            } catch(err) {
              console.error(`Couldn't add new message ${uid}`,err)
              res.status(500).send(err);
            }
            break;
    }
}