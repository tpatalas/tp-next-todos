import { SCHEMA_TODO } from '@data/dataTypesObjects';
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
    query: { model: model },
  } = req;

  const data: Todos = body;
  const query: Partial<Todos> = {
    user_id: userInfo._id,
  };

  switch (method) {
    case 'GET':
      query.deleted = { $ne: true };

      const SCHEMA = {
        todoItem: TodoItem,
        todoNote: TodoNote,
      };

      try {
        const getTodo = await SCHEMA[model as SCHEMA_TODO]
          .find(query)
          .select({
            _id: 1,
            priorityLevel: 1,
            priorityRankScore: 1,
            completed: 1,
            completedDate: 1,
          })
          .lean();
        if (!getTodo) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: getTodo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      const session = await mongoose.startSession();
      session.startTransaction();

      const {
        _id,
        title,
        completed,
        completedDate,
        dueDate,
        createdDate,
        priorityLevel,
        priorityRankScore,
        labelItem,
        note,
      } = data;

      const todoItem = {
        title,
        _id,
        completed,
        completedDate,
        dueDate,
        createdDate,
        priorityLevel,
        priorityRankScore,
        update: Date.now(),
        user_id: userInfo._id,
      };

      const todoNote = {
        note,
        title_id: _id,
        update: Date.now(),
        user_id: userInfo._id,
      };

      try {
        const createdTodoItem = await TodoItem.create([todoItem], { session: session });
        const createdTodoNote = note && (await TodoNote.create([todoNote], { session: session }));
        const createdLabel =
          labelItem &&
          (await Promise.all(
            labelItem.map(async (label: Labels) => {
              return await Label.updateMany(
                { _id: label._id },
                { $set: label },
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
