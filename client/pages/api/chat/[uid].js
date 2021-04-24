import dbConnect from '../../../util/dbConnect';
import User from '../../../models/users'

dbConnect();

 export default async (req,res) => {
     const {method} = req;
     const {uid} = req.query;
     console.log(uid);
     req.body = JSON.parse(req.body)

    switch(method) {
         // by user id, add a new chat
          case 'POST':
            const chat = {
              _id:req.body.id,
              user1Id: req.body.user1Id,
              username1: req.body.username1,
              user2Id: req.body.user2Id,
              username2: req.body.username2,
            }
            try {
              const user = await User.findOne({uid:uid})
              const update = user.chats.push(chat);
              const result = await User.findOneAndUpdate({uid},{chats:update},{new:true});
              res.status(201).send(result)
            } catch(err) {
              console.error(`Couldn't add new chat ${uid}`,err)
              res.status(500).send(err);
            }
            break;
          //update unread, updated
          case 'PUT':
            try {
              let {id} = req.body;
              const user = await User.findOne({uid:uid});
              const update = user.chats.map((chat)=> {
                if (chat._id===id) {
                  let newChat = {
                    ...chat,
                    updated: Date.now(),
                    unread: !chat.unread
                  }
                  return newChat;
                } else {
                  return chat;
                }
              })
              const result = await User.findOneAndUpdate({uid},{chats:update},{new:true});
              res.status(200).send(result);
            } catch (err) {
              console.error(`Couldn't update chat: ${id}`, err);
              res.status(500).send(err);
            }
            break;
          //remove chat by id in req.body
          case 'DELETE':
            try {
              const {id} = req.body.id
              const user = await User.findOne({uid:uid});
              const update = user.chats.filter((chat)=> chat._id!=id);
              await User.findOneAndUpdate({uid},{chats:update},{new:true});
              res.status(204).send();
            } catch (err) {
              console.error(`Couldn't remove chat: ${id}`, err);
              res.status(500).send(err);
            }
            break;
    }
}