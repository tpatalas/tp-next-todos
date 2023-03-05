import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import User from '@lib/models/User';
import { Users } from '@lib/types';
import { hashDataString, validateEmailFormat, validateStrongPassword } from '@states/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const Users = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();
  const session = await getServerSession(req, res, authOptions);

  const { method, body } = req;
  const data: Users = body;

  switch (method) {
    case 'POST':
      if (session) return res.status(401).json({ success: false });

      const newUser = {
        email: data.email,
        password: await hashDataString(data.password),
      };

      try {
        if (
          !data.email ||
          !data.password ||
          !validateEmailFormat(data.email) ||
          !validateStrongPassword(data.password)
        ) {
          return res.status(400).json({ success: false });
        }
        await User.create(newUser);
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
