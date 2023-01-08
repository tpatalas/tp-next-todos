import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import Label from '@lib/models/Label';
import { NextApiRequest, NextApiResponse } from 'next';

const LabelById = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();

  const {
    method,
    body,
    query: { labelId },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const getLabelById = await Label.findById(labelId);
        if (!getLabelById) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: getLabelById });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const updateLabelById = await Label.findByIdAndUpdate(labelId, body, {
          new: true,
          runValidators: true,
        });
        if (!updateLabelById) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: updateLabelById });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deleteLabelById = await Label.findByIdAndDelete(labelId);
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
