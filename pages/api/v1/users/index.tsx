import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import User from '@lib/models/User';
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
        if (!getUser) return res.status(400).json({ success: false });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const createUser = await User.create(body);
        if (!createUser) return res.status(400).json({ success: false });
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
