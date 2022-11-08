import { databaseConnect } from '@lib/dataConnections/dataConnection';
import Setting from '@lib/models/user/setting';

import { NextApiRequest, NextApiResponse } from 'next';

const UserSetting = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { userId: _id },
  } = req;

  await databaseConnect();

  switch (method) {
    case 'GET':
      try {
        const getSetting = await Setting.find({ userId: _id });
        // res.setHeader('Cache-Control', `private, max-age=${dayInSecond * 30}`);
        res.status(200).json({ success: true, data: getSetting });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const createSetting = await Setting.create(body);
        res.status(200).json({ success: true, data: createSetting });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default UserSetting;
