import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import Label from '@lib/models/Label';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { OBJECT_ID, RETENTION } from '@constAssertions/data';
import { sanitize, sanitizeObject, retentionPolicy } from '@stateLogics/utils';
import { Labels } from '@label/label.types';

const LabelById = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user._id;

  const {
    method,
    body,
    query: { labelId },
  } = req;

  const dataPatch: Labels = body;

  const sanitizedData = sanitizeObject(dataPatch) as Labels;
  const sanitizedLabelId = labelId ? sanitize(labelId as string) : undefined;

  const filter: Partial<Labels> = {
    _id: sanitizedLabelId as OBJECT_ID,
    user_id: userId,
  };

  switch (method) {
    case 'GET':
      if (!session) return res.status(401).json({ success: false, message: 'unauthorized access' });

      try {
        const getLabelById = await Label.findOne(filter);
        if (!getLabelById) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: getLabelById });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PATCH':
      if (!session) return res.status(401).json({ success: false, message: 'unauthorized access' });

      try {
        const updateLabelById = await Label.findByIdAndUpdate(
          sanitizedLabelId,
          { ...sanitizedData, update: Date.now() },
          { upsert: true, new: true, runValidators: true },
        );
        if (!updateLabelById) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: updateLabelById });
      } catch (error) {
        error instanceof Error && res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'DELETE':
      if (!session) return res.status(401).json({ success: false, message: 'unauthorized access' });

      try {
        const deleteLabelById = await Label.findByIdAndUpdate(
          sanitizedLabelId,
          {
            // later deleted value can be passed through DELETE request with body to create the trashcan.
            // example:
            // deleted: deleted
            // expireAt: deleted ? retentionPolicy({ day: RETENTION['7'] }) : undefined
            update: Date.now(),
            deleted: true,
            expireAt: retentionPolicy({ day: RETENTION['7'] }),
          },
          {
            new: true,
            runValidators: true,
          },
        );
        if (!deleteLabelById) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: deleteLabelById });
      } catch (error) {
        error instanceof Error && res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};

export default LabelById;
