import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import Label from '@lib/models/Label';
import TodoItem from '@lib/models/Todo/TodoItems';
import TodoNote from '@lib/models/Todo/TodoNotes';
import { Labels, Todos } from '@lib/types';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { userInfo } from 'userInfo';

const Todos = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();

  const {
    method,
    body,
    query: { update: lastUpdate },
  } = req;

  const data: Todos = body;
  const query: Partial<Todos> = {
    user_id: userInfo._id,
  };

  switch (method) {
    case 'GET':
      query.update = { $gt: Number(lastUpdate) };
      if (Number(lastUpdate) === 0) query.deleted = { $ne: true };

      try {
        const getTodo = await TodoItem.find(query)
          .select({
            _id: 1,
            priorityLevel: 1,
            priorityRankScore: 1,
            completed: 1,
            completedDate: 1,
            deleted: 1,
          })
          .lean();
        if (!getTodo) return res.status(400).json({ success: false });
        getTodo.length === 0
          ? res.status(200).json({ success: true, data: getTodo }) // Don't update the client if there is update value. getTodo will return [] empty array
          : res.status(200).json({ success: true, update: Date.now().toString(), data: getTodo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      const session = await mongoose.startSession();
      session.startTransaction();

      const todoItem = {
        title: data.title,
        _id: data._id,
        completed: data.completed,
        completedDate: data.completedDate,
        dueDate: data.dueDate,
        createdDate: data.createdDate,
        priorityLevel: data.priorityLevel,
        priorityRankScore: data.priorityRankScore,
        update: Date.now(),
        user_id: userInfo._id,
      };

      const todoNote = {
        note: data.note,
        title_id: data._id,
        update: Date.now(),
        user_id: userInfo._id,
      };

      try {
        const createdTodoItem = await TodoItem.create([todoItem], { session: session });
        const createdTodoNote = data.note && (await TodoNote.create([todoNote], { session: session }));
        const createdLabel =
          data.labelItem &&
          (await Promise.all(
            data.labelItem.map(async (label: Labels) => {
              const updatedLabel = {
                ...label,
                update: Date.now(),
              };
              return await Label.updateMany(
                { _id: label._id },
                { $set: updatedLabel },
                {
                  session: session,
                },
              );
            }),
          ));

        await Promise.all([createdTodoItem, createdTodoNote, createdLabel]);
        await session.commitTransaction();
        res.status(201).json({ success: true, data: data });
      } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ success: false });
      } finally {
        session.endSession();
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};
export default Todos;
