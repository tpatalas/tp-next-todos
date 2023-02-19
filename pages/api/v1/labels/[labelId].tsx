import { OBJECT_ID } from '@data/dataTypesConst';
import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import Label from '@lib/models/Label';
import { Labels } from '@lib/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { userInfo } from 'userInfo';

const LabelById = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();

  const {
    method,
    body,
    query: { labelId },
  } = req;
  const data: Labels = body;

  const query: Partial<Labels> = {
    _id: labelId as OBJECT_ID,
    user_id: userInfo._id,
  };

  switch (method) {
    case 'GET':
      try {
        const getLabelById = await Label.findOne(query);
        if (!getLabelById) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: getLabelById });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const updateLabelById = await Label.findByIdAndUpdate(
          labelId,
          { ...data, update: Date.now() },
          { upsert: true, new: true, runValidators: true },
        );
        if (!updateLabelById) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: updateLabelById });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deleteLabelById = await Label.findByIdAndUpdate(
          labelId,
          {
            update: Date.now(),
            deleted: true,
          },
          {
            new: true,
            runValidators: true,
          },
        );
        if (!deleteLabelById) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: deleteLabelById });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};

export default LabelById;
