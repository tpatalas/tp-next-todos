import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import Tag from '@lib/models/Tag';
import { NextApiRequest, NextApiResponse } from 'next';

const TagById = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();

  const {
    method,
    body,
    query: { tagId },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const getTagById = await Tag.findById(tagId);
        if (!getTagById) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: getTagById });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const updateTagById = await Tag.findByIdAndUpdate(tagId, body, {
          new: true,
          runValidators: true,
        });
        if (!updateTagById) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: updateTagById });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deleteTagById = await Tag.findByIdAndDelete(tagId);
        if (!deleteTagById) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: deleteTagById });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};

export default TagById;
