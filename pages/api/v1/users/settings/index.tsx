import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import Setting from '@lib/models/User/setting';
import { Settings } from '@lib/types';

import { NextApiRequest, NextApiResponse } from 'next';

const UserSetting = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();

  const {
    method,
    body,
    query: { userId: _id },
  } = req;

  const data: Settings = body;

  switch (method) {
    case 'GET':
      try {
        const getSetting = await Setting.find({ userId: _id });
        if (!getSetting) return res.status(400).json({ susccess: false });
        res.status(200).json({ success: true, data: getSetting });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const createSetting = await Setting.create(data);
        if (!createSetting) return res.status(400).json({ success: false });
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
