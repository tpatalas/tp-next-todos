import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import User from '@lib/models/User';
import { Users } from '@lib/types';
import { hashDataString, validateEmailFormat, validateStrongPassword } from '@states/utils';
import { NextApiRequest, NextApiResponse } from 'next';

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();

  const {
    method,
    body,
    query: { _id: userId },
  } = req;
  const data: Users = body;

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
        const newUser = {
          email: data.email,
          password: hashDataString(data.password),
        };

        const createUser = await User.create(newUser);
        if (
          !data.email ||
          !data.password ||
          !validateEmailFormat(data.email) ||
          !validateStrongPassword(data.password) ||
          !createUser
        ) {
          return res.status(400).json({ success: false });
        }
        res.status(201).json({ success: true, message: 'Created user successfully' });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};

export default Users;
