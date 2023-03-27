import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import Label from '@lib/models/Label';
import { sanitizedUserLabels } from '@lib/sanitizers/sanitizedSchemas';
import { Labels } from '@lib/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const Labels = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user._id;

  const {
    method,
    body,
    query: { update: lastUpdate },
  } = req;

  const filter: Partial<Labels> = {
    user_id: userId,
  };

  switch (method) {
    case 'GET':
      if (!session) return res.status(401).json({ success: false, message: 'unauthorized access' });

      filter.update = { $gt: Number(lastUpdate) };
      if (Number(lastUpdate) === 0) filter.deleted = { $ne: true };

      try {
        const getLabels = await Label.find(filter)
          .select({ _id: 1, name: 1, parent_id: 1, title_id: 1, color: 1, deleted: 1 })
          .lean();
        getLabels.length === 0
          ? res.status(200).json({ success: true, data: getLabels }) // Don't update the client if there is update value. getTodo will return [] empty array
          : res.status(200).json({ success: true, update: Date.now().toString(), data: getLabels });
      } catch (error) {
        error instanceof Error && res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'POST':
      if (!session) return res.status(401).json({ success: false, message: 'unauthorized access' });

      const dataPost: Labels = body;

      const { _id, parent_id, title_id, name, color } = dataPost;
      const labelItem = { _id, parent_id, title_id, name, color, update: Date.now(), user_id: userId };
      try {
        const createLabel = await Label.create(labelItem);
        res.status(201).json({ success: true, data: createLabel });
      } catch (error) {
        error instanceof Error && res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'PUT':
      if (!session) return res.status(401).json({ success: false, message: 'unauthorized access' });

      const dataPut: Labels[] = body;
      const sanitizedLabels = sanitizedUserLabels(dataPut);

      try {
        const sanitizedUpdateLabel = sanitizedLabels.map((label) => {
          return {
            ...label,
            update: Date.now(),
          };
        });

        const updateLabel = sanitizedUpdateLabel.map((label) =>
          Label.updateMany({ _id: label._id }, { $set: label }, { upsert: true, runValidators: true }),
        );

        const updatedLabel = await Promise.all(updateLabel);

        res.status(200).json({ success: true, data: updatedLabel });
      } catch (error) {
        error instanceof Error && res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};
export default Labels;
