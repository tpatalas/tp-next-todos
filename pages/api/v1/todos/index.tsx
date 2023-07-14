import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import Label from '@lib/models/Label';
import TodoItem from '@lib/models/Todo/TodoItems';
import TodoNote from '@lib/models/Todo/TodoNotes';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { Labels } from '@label/label.types';
import { TypesTodos } from '@components/todos/todos.types';

const Todos = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user._id;

  const {
    method,
    body,
    query: { update: lastUpdate },
  } = req;

  const data: TypesTodos = body;
  const filter: Partial<TypesTodos> = {
    user_id: userId,
  };

  switch (method) {
    case 'GET':
      if (!session) return res.status(401).json({ success: false, message: 'unauthorized access' });

      filter.update = { $gt: Number(lastUpdate) };
      if (Number(lastUpdate) === 0) filter.deleted = { $ne: true };

      try {
        const getTodo = await TodoItem.find(filter)
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
        error instanceof Error && res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'POST':
      if (!session) return res.status(401).json({ success: false, message: 'unauthorized access' });

      const sessionPost = await mongoose.startSession();
      sessionPost.startTransaction();

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
        user_id: userId,
      };

      const todoNote = {
        note: data.note,
        title_id: data._id,
        update: Date.now(),
        user_id: userId,
      };

      try {
        const createdTodoItem = await TodoItem.create([todoItem], { session: sessionPost });
        const createdTodoNote = data.note && (await TodoNote.create([todoNote], { session: sessionPost }));
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
                  session: sessionPost,
                },
              );
            }),
          ));

        await Promise.all([createdTodoItem, createdTodoNote, createdLabel]);
        await sessionPost.commitTransaction();
        res.status(201).json({ success: true, data: data });
      } catch (error) {
        await sessionPost.abortTransaction();
        error instanceof Error && res.status(400).json({ success: false, message: error.message });
      } finally {
        sessionPost.endSession();
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};
export default Todos;
