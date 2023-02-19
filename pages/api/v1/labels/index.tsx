import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import Label from '@lib/models/Label';
import { Labels } from '@lib/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { userInfo } from 'userInfo';

const Labels = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();

  const { method, body } = req;

  const data: Labels = body;

  const query: Partial<Labels> = {
    user_id: userInfo._id,
  };

  switch (method) {
    case 'GET':
      query.deleted = { $ne: true };

      try {
        const getLabels = await Label.find(query)
          .select({ _id: 1, name: 1, parent_id: 1, title_id: 1, color: 1 })
          .lean();
        res.status(200).json({ success: true, data: getLabels });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      const { _id, parent_id, title_id, name, color } = data;
      const labelItem = { _id, parent_id, title_id, name, color, update: Date.now(), user_id: userInfo._id };
      try {
        const createLabel = await Label.create(labelItem);
        res.status(201).json({ success: true, data: createLabel });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      const arrayObjectData: Labels[] = body;
      try {
        const updateLabel = await Promise.all(
          arrayObjectData.map(async (label: Labels) => {
            const updatedLabel = {
              ...label,
              update: Date.now(),
            };
            return await Label.updateMany(
              { _id: label._id },
              { $set: updatedLabel },
              { upsert: true, new: true, runValidators: true },
            );
          }),
        );
        if (!updateLabel) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: updateLabel });
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;
    default:
      res.status(400).json({ success: false });
  }
};
export default Labels;
