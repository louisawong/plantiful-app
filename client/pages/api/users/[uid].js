import dbConnect from '../../../util/dbConnect';
import User from '../../../models/users';

dbConnect();

 export default async (req,res) => {
     const {method} = req;
     const {uid} = req.query;
     //console.log("METHOD", method);

    switch(method) {
        //getting all a user's info by uid
         case 'GET':
             try {
               const user = await User.findOne({uid: uid })
               //console.log("FROM SERVER", user)∂
               res.status(200).send(user);
             }catch (err) {
               console.error(`Couldn't get user: ${uid}`, err)
               res.status(500).send("cannot get single user info", err);
             }
             break;
        //making a new account
          case 'POST':
            //req.body = JSON.parse(req.body)
            const user = {
              uid: req.body.uid,
              username: req.body.username,
              email: req.body.email,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
            }
            try {
              const result = await User.create(user);
              res.status(201).send(result)
            } catch(err) {
              console.error(`Couldn't add new user ${uid}`,err)
              res.status(500).send(err);
            }
            break;
          //editing any info in user
          case 'PUT':
            try {
              const result = await User.findOneAndUpdate(
                {uid:uid},
                req.body,
                {new:true}
              );
              res.status(200).send(result);
            } catch (err) {
              console.error(`Couldn't update user: ${uid}`, err);
              res.status(500).send(err);
            }
            break;
          //soft deleting the user
          case 'DELETE':
            try {
              await User.findOneAndUpdate(
                {uid:uid},
                {removed: req.body.removed}
              );
              res.status(204);
              res.redirect("/");
              res.send();
            } catch (err) {
              console.error(`Couldn't remove user: ${uid}`, err);
              res.status(500).send(err);
            }
            break;
    }
}