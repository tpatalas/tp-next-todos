import { OBJECT_ID } from '@data/dataTypesConst';
import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import Label from '@lib/models/Label';
import { Labels } from '@lib/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const LabelById = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user._id;

  const {
    method,
    body,
    query: { labelId },
  } = req;
  const data: Labels = body;

  const query: Partial<Labels> = {
    _id: labelId as OBJECT_ID,
    user_id: userId,
  };

  switch (method) {
    case 'GET':
      if (!session) return res.status(401).json({ success: false, message: 'unauthorized access' });

      try {
        const getLabelById = await Label.findOne(query);
        if (!getLabelById) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: getLabelById });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      if (!session) return res.status(401).json({ success: false, message: 'unauthorized access' });

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
      if (!session) return res.status(401).json({ success: false, message: 'unauthorized access' });

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
