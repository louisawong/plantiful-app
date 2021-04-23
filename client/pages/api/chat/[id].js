import dbConnect from '../../../util/dbConnect';
import Chat from '../../../models/chats'

dbConnect();

 export default async (req,res) => {
     const {method} = req.method;
     const {id} = req.query;
     console.log(id);

    switch(method) {
         case 'GET':
             try {
               const chat = await Chat.findOne({_id: id })
               res.status(200).send(chat);
             }catch (err) {
               console.error(`Couldn't get chat: ${id}`, err)
               res.status(500).send(err);
             }
             break;
          case 'POST':
            const chat = {
              user1Id: req.body.user1Id,
              username1: req.body.username1,
              user2Id: req.body.user2Id,
              username2: req.body.username2,
            }
            try {
              const result = await Chat.create(chat);
              res.status(201).send(result)
            } catch(err) {
              console.error(`Couldn't add new chat ${id}`,err)
              res.status(500).send(err);
            }
            break;
          case 'PUT':
            try {
              const messages = await Chat.findById(id);
              const newMessages = messages.push(req.body.message);
              const result = await Chat.findOneAndUpdate(
                {_id:id},
                {messages: newMessages,
                updated:Date.now()},
                {new:true}
              );
              res.status(200).send(result);
            } catch (err) {
              console.error(`Couldn't add message chat: ${id}`, err);
              res.status(500).send(err);
            }
            break;
          case 'DELETE':
            try {
              await Chat.findOneAndUpdate(
                {_id:id},
                {removed: req.body.removed,
                updated: date.now()}
              );
              res.status(204).send();
            } catch (err) {
              console.error(`Couldn't remove chat: ${id}`, err);
              res.status(500).send(err);
            }
    }
}