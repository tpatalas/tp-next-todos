import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import Setting from '@lib/models/User/setting';
import { NextApiRequest, NextApiResponse } from 'next';

const UserSettingById = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { settingId },
  } = req;

  await databaseConnect();

  switch (method) {
    case 'GET':
      try {
        const getSettingById = await Setting.findById(settingId);
        if (!getSettingById) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: getSettingById });
      } catch (error) {
        res.status(400).json({ success: false });
      }

    case 'PUT':
      try {
        const updateSettingById = await Setting.findByIdAndUpdate(settingId, body, {
          new: true,
          runValidators: true,
        });
        if (!updateSettingById) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: updateSettingById });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PATCH':
      try {
        const updateSettingById = await Setting.findByIdAndUpdate(settingId, body, {
          new: true,
          runValidators: true,
        });
        if (!updateSettingById) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: updateSettingById });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deleteSettingById = await Setting.findByIdAndDelete(settingId);
        if (!deleteSettingById) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: deleteSettingById });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default UserSettingById;
