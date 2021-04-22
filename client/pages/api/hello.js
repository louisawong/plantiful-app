import dbConnect from '../../util/dbConnect';
//import User from '../../../models/users';

dbConnect();

export default async (req,res) => {
  res.send('hello')
}