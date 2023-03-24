import { OBJECT_ID, RETENTION, SCHEMA_TODO } from '@constAssertions/data';
import { aggregatedTodoItem } from '@lib/dataConnections/aggregationPipeline';
import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import Label from '@lib/models/Label';
import TodoItem from '@lib/models/Todo/TodoItems';
import TodoNote from '@lib/models/Todo/TodoNotes';
import { sanitizedUserLabels, sanitizedUserTodoItem, sanitizedUserTodoNote } from '@lib/sanitizers/sanitizedSchemas';
import { Todos } from '@lib/types';
import { retentionPolicy, sanitize } from '@stateLogics/utils';
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

  const sanitizedTodoId = todoId ? sanitize(todoId as string) : undefined;

  const data: Todos = body;
  const queriedTodoId = sanitizedTodoId as OBJECT_ID;

  const filter = (type: SCHEMA_TODO) => {
    const query: Partial<Todos> = {
      user_id: userId,
    };
    type === SCHEMA_TODO['todoItem'] && (query._id = queriedTodoId);
    type === SCHEMA_TODO['todoNote'] && (query.title_id = queriedTodoId);
    return query;
  };

  const sanitizedTodoItem = sanitizedUserTodoItem(data);
  const sanitizedTodoNote = sanitizedUserTodoNote(data);
  const sanitizedLabels = sanitizedUserLabels(data.labelItem);

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

      try {
        const updatedTodoItem = await TodoItem.findOneAndUpdate(filter(SCHEMA_TODO['todoItem']), sanitizedTodoItem, {
          session: sessionPut,
          upsert: true,
          new: true,
          runValidators: true,
        });

        const updatedTodoNote =
          sanitizedTodoNote &&
          (await TodoNote.findOneAndUpdate(filter(SCHEMA_TODO['todoNote']), sanitizedTodoNote, {
            session: sessionPut,
            upsert: true,
            new: true,
            runValidators: true,
          }));

        const sanitizedUpdateLabel = sanitizedLabels.map((label) => {
          return {
            ...label,
            update: Date.now(),
          };
        });

        const updatedLabelPromises = sanitizedUpdateLabel.map((label) =>
          Label.updateMany(
            { _id: label._id },
            { $set: label },
            { session: sessionPut, upsert: true, runValidators: true },
          ),
        );
        const updatedLabelPromised = await Promise.all(updatedLabelPromises);

        const updatedTodo = await Promise.all([updatedTodoItem, updatedTodoNote, updatedLabelPromised]).then(
          ([updatedTodoItem, updatedTodoNote, updatedLabelPromised]) => ({
            updatedTodoItem,
            updatedTodoNote,
            updatedLabel: updatedLabelPromised,
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

      const sanitizedData = {
        ...sanitizedTodoItem,
        ...sanitizedTodoNote,
        labelItem: sanitizedLabels,
      };

      try {
        const updateItem = await TodoItem.findOneAndUpdate(
          filter(SCHEMA_TODO['todoItem']),
          { ...sanitizedData, update: Date.now() },
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
        {
          deleted: true,
          update: Date.now(),
          expireAt: retentionPolicy({ day: RETENTION['7'] }),
        },
        { session: sessionDelete, new: true, runValidators: true },
      );
      const deleteNote = await TodoNote.findOneAndUpdate(
        filter(SCHEMA_TODO['todoNote']),
        {
          update: Date.now(),
          deleted: true,
          expireAt: retentionPolicy({ day: RETENTION['7'] }),
        },
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
