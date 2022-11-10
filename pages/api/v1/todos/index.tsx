import { SCHEMA_TODO } from '@data/stateObjects';
import TodoItem from '@lib/models/Todo/TodoItems';
import TodoNote from '@lib/models/Todo/TodoNotes';
import { TypesQuery } from '@lib/types';
import { subDays } from 'date-fns';
import { databaseConnect } from 'lib/dataConnections/dataConnection';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { userInfo } from 'userInfo';

const Todos = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();

  const {
    method,
    body,
    query: { model: model, completed: isCompleted = false, completedFromToday: completedFromToday },
  } = req;

  const queries: TypesQuery = {};
  queries.user_id = userInfo._id;
  if (typeof isCompleted !== 'undefined') {
    queries.completed = isCompleted;
    typeof completedFromToday !== 'undefined' &&
      (queries.completedDate = {
        $gt: subDays(new Date(), parseInt(`${completedFromToday}`)),
        $lt: new Date(),
      });
  }

  switch (method) {
    case 'GET':
      const SCHEMA = {
        todoItem: TodoItem,
        todoNote: TodoNote,
      };

      try {
        const getTodo = await SCHEMA[model as SCHEMA_TODO].find(queries).select({ _id: 1 }).lean();
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
        note,
      } = body;
      const todoItem = {
        title,
        _id,
        completed,
        completedDate,
        dueDate,
        createdDate,
        priorityLevel,
        priorityRankScore,
        user_id: userInfo._id,
      };
      const todoNote = {
        note,
        title_id: _id,
        user_id: userInfo._id,
      };
      const createdTodoItem = await TodoItem.create([todoItem], { session });
      const createdTodoNote = note && (await TodoNote.create([todoNote]), { session });

      try {
        await Promise.all([createdTodoItem, createdTodoNote]);
        await session.commitTransaction();
        res.status(201).json({ success: true, data: body });
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
