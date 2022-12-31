import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import Tag from '@lib/models/Tag';
import { TypesQuery } from '@lib/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { userInfo } from 'userInfo';

const Tags = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();

  const { method, body } = req;

  const filter = () => {
    const query: TypesQuery = {};
    query.user_id = userInfo._id;

    return query;
  };

  switch (method) {
    case 'GET':
      try {
        const getTags = await Tag.find(filter())
          .select({ _id: 1, name: 1, parent_id: 1, title_id: 1 })
          .lean();
        res.status(200).json({ success: true, data: getTags });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const createTag = await Tag.create(body);
        res.status(201).json({ success: true, data: createTag });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};
export default Tags;
