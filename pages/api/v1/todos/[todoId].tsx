import { OBJECT_ID, SCHEMA_TODO } from '@data/dataTypesObjects';
import { aggregatedTodoItem } from '@lib/dataConnections/aggregationPipeline';
import { databaseConnect } from '@lib/dataConnections/databaseConnection';
import Label from '@lib/models/Label';
import TodoItem from '@lib/models/Todo/TodoItems';
import TodoNote from '@lib/models/Todo/TodoNotes';
import { Labels, Todos } from '@lib/types';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { userInfo } from 'userInfo';

const TodosById = async (req: NextApiRequest, res: NextApiResponse) => {
  await databaseConnect();
  const session = await mongoose.startSession();

  const {
    method,
    body,
    query: { todoId },
  } = req;

  const data: Todos = body;
  const queriedTodoId = todoId as OBJECT_ID;

  const { title, completed, completedDate, dueDate, createdDate, priorityLevel, priorityRankScore, labelItem, note } =
    data;

  const filter = (type: SCHEMA_TODO) => {
    const query: Partial<Todos> = {
      user_id: userInfo._id,
    };
    type === SCHEMA_TODO['todoItem'] && (query._id = queriedTodoId);
    type === SCHEMA_TODO['todoNote'] && (query.title_id = queriedTodoId);
    return query;
  };

  switch (method) {
    case 'GET':
      try {
        const getItem = await TodoItem.aggregate(
          aggregatedTodoItem({ todoId: queriedTodoId, userId: userInfo._id }),
        ).then((data: Todos[]) => data[0]);

        if (!getItem) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: getItem });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      session.startTransaction();

      const todoItem = {
        title,
        completed,
        completedDate,
        dueDate,
        createdDate,
        priorityLevel,
        priorityRankScore,
        update: Date.now(),
      };

      const todoNote = {
        note,
        update: Date.now(),
      };

      try {
        const updatedTodoItem = await TodoItem.findOneAndUpdate(filter(SCHEMA_TODO['todoItem']), todoItem, {
          session: session,
          upsert: true,
          new: true,
          runValidators: true,
        });

        const updatedTodoNote = await TodoNote.findOneAndUpdate(filter(SCHEMA_TODO['todoNote']), todoNote, {
          session: session,
          upsert: true,
          new: true,
          runValidators: true,
        });

        const updatedLabel =
          labelItem &&
          (await Promise.all(
            labelItem.map(async (label: Labels) => {
              return await Label.updateMany(
                { _id: label._id },
                { $set: label },
                {
                  session: session,
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
        await session.commitTransaction();
        res.status(200).json({ success: true, data: updatedTodo });
      } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ success: false });
      } finally {
        session.endSession();
      }
      break;

    case 'PATCH':
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
      session.startTransaction();
      const deleteItem = await TodoItem.findOneAndUpdate(
        filter(SCHEMA_TODO['todoItem']),
        { update: Date.now(), deleted: true },
        { session: session, new: true, runValidators: true },
      );
      const deleteNote = await TodoNote.findOneAndUpdate(
        filter(SCHEMA_TODO['todoNote']),
        { update: Date.now(), deleted: true },
        { session: session, new: true, runValidators: true },
      );

      try {
        const deletedTodo = await Promise.all([deleteItem, deleteNote]).then(([deletedItem, deletedNote]) => ({
          deletedItem,
          deletedNote,
        }));
        await session.commitTransaction();
        res.status(200).json({ success: true, data: deletedTodo });
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
export default TodosById;
