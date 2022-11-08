import { databaseConnect } from '@lib/dataConnections/dataConnection';
import User from '@lib/models/user';
import { NextApiRequest, NextApiResponse } from 'next';

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { _id: userId },
  } = req;

  await databaseConnect();

  switch (method) {
    case 'GET':
      try {
        const getUser = await User.find({ _id: userId }, '_id');
        // res.setHeader('Cache-Control', `private, max-age=${dayInSecond * 30}`);
        res.status(200).json({ success: true, data: getUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const createUser = await User.create(body);
        res.status(201).json({ success: true, data: createUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default Users;
