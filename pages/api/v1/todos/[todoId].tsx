import { OBJECT_ID, SCHEMA_TODO } from '@data/dataTypesConst';
import { aggregatedTodoItem } from '@lib/dataConnections/aggregationPipeline';
import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import Label from '@lib/models/Label';
import TodoItem from '@lib/models/Todo/TodoItems';
import TodoNote from '@lib/models/Todo/TodoNotes';
import { Labels, Todos } from '@lib/types';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

const TodosById = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();
  const session = await getServerSession(req, res, authOptions);
  const userId = session?.user._id;

  const {
    method,
    body,
    query: { todoId },
  } = req;

  const data: Todos = body;
  const queriedTodoId = todoId as OBJECT_ID;

  const filter = (type: SCHEMA_TODO) => {
    const query: Partial<Todos> = {
      user_id: userId,
    };
    type === SCHEMA_TODO['todoItem'] && (query._id = queriedTodoId);
    type === SCHEMA_TODO['todoNote'] && (query.title_id = queriedTodoId);
    return query;
  };

  switch (method) {
    case 'GET':
      if (!session) return res.status(401).json({ success: false, message: 'unauthorized access' });

      try {
        const getItem = await TodoItem.aggregate(aggregatedTodoItem({ todoId: queriedTodoId, userId: userId })).then(
          (data: Todos[]) => data[0],
        );

        if (!getItem) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: getItem });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      if (!session) return res.status(401).json({ success: false, message: 'unauthorized access' });

      const sessionPut = await mongoose.startSession();

      sessionPut.startTransaction();

      const todoItem = {
        title: data.title,
        completed: data.completed,
        completedDate: data.completedDate,
        dueDate: data.dueDate,
        createdDate: data.createdDate,
        priorityLevel: data.priorityLevel,
        priorityRankScore: data.priorityRankScore,
        update: Date.now(),
      };

      const todoNote = {
        note: data.note,
        update: Date.now(),
      };

      try {
        const updatedTodoItem = await TodoItem.findOneAndUpdate(filter(SCHEMA_TODO['todoItem']), todoItem, {
          session: sessionPut,
          upsert: true,
          new: true,
          runValidators: true,
        });

        const updatedTodoNote = await TodoNote.findOneAndUpdate(filter(SCHEMA_TODO['todoNote']), todoNote, {
          session: sessionPut,
          upsert: true,
          new: true,
          runValidators: true,
        });

        const updatedLabel =
          data.labelItem &&
          (await Promise.all(
            data.labelItem.map(async (label: Labels) => {
              const updatedLabel = { ...label, update: Date.now() };
              return await Label.updateMany(
                { _id: label._id },
                { $set: updatedLabel },
                {
                  session: sessionPut,
                  upsert: true,
                  new: true,
                  runValidators: true,
                },
              );
            }),
          ));

        const updatedTodo = await Promise.all([updatedTodoItem, updatedTodoNote, updatedLabel]).then(
          ([updatedTodoItem, updatedTodoNote, updatedLabel]) => ({
            updatedTodoItem,
            updatedTodoNote,
            updatedLabel,
          }),
        );
        await sessionPut.commitTransaction();
        res.status(200).json({ success: true, data: updatedTodo });
      } catch (error) {
        await sessionPut.abortTransaction();
        res.status(400).json({ success: false });
      } finally {
        sessionPut.endSession();
      }
      break;

    case 'PATCH':
      if (!session) return res.status(401).json({ success: false, message: 'unauthorized access' });

      try {
        const updateItem = await TodoItem.findOneAndUpdate(
          filter(SCHEMA_TODO['todoItem']),
          { ...data, update: Date.now() },
          {
            new: true,
            runValidators: true,
          },
        );
        if (!updateItem) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: updateItem });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      if (!session) return res.status(401).json({ success: false, message: 'unauthorized access' });

      const sessionDelete = await mongoose.startSession();

      sessionDelete.startTransaction();
      const deleteItem = await TodoItem.findOneAndUpdate(
        filter(SCHEMA_TODO['todoItem']),
        { deleted: true, update: Date.now() },
        { session: sessionDelete, new: true, runValidators: true },
      );
      const deleteNote = await TodoNote.findOneAndUpdate(
        filter(SCHEMA_TODO['todoNote']),
        { update: Date.now(), deleted: true },
        { session: sessionDelete, new: true, runValidators: true },
      );

      try {
        const deletedTodo = await Promise.all([deleteItem, deleteNote]).then(([deletedItem, deletedNote]) => ({
          deletedItem,
          deletedNote,
        }));
        await sessionDelete.commitTransaction();
        res.status(200).json({ success: true, data: deletedTodo });
      } catch (error) {
        await sessionDelete.abortTransaction();
        res.status(400).json({ success: false });
      } finally {
        sessionDelete.endSession();
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};
export default TodosById;
