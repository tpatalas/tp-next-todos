import { SCHEMA_TODO } from '@data/stateObjects';
import { aggregatedTodoItem } from '@lib/dataConnections/aggregationPipeline';
import TodoItem from '@lib/models/todo/TodoItems';
import TodoNote from '@lib/models/todo/TodoNotes';
import { TypesQuery } from '@lib/types';
import { databaseConnect } from 'lib/dataConnections/dataConnection';
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

  const queries = (type: SCHEMA_TODO) => {
    const query: TypesQuery = {};
    query.user_id = userInfo._id;
    type === SCHEMA_TODO['todoItem'] && (query._id = todoId);
    type === SCHEMA_TODO['todoNote'] && (query.title_id = todoId);

    return query;
  };

  switch (method) {
    case 'GET':
      try {
        const getItem = await TodoItem.aggregate(
          aggregatedTodoItem({ todoId: todoId, userId: userInfo._id }),
        ).then((data: TypesQuery) => data[0]);

        if (!getItem) {
          return res.status(400).json({ success: false });
        }
        // ? uncomment below to enable the API cache
        // res.setHeader('Cache-Control', `private, max-age=${dayInSecond * 30}`);
        // Seems not necessary if indexedDd is use.
        res.status(200).json({ success: true, data: getItem });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      session.startTransaction();

      const {
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
        completed,
        completedDate,
        dueDate,
        createdDate,
        priorityLevel,
        priorityRankScore,
      };
      const todoNote = {
        note,
      };

      const updatedTodoItem = await TodoItem.findOneAndUpdate(
        queries(SCHEMA_TODO['todoItem']),
        todoItem,
        {
          session: session,
          new: true,
          runValidators: true,
        },
      );
      const updatedTodoNote = await TodoNote.findOneAndUpdate(
        queries(SCHEMA_TODO['todoNote']),
        todoNote,
        {
          session: session,
          new: true,
          runValidators: true,
        },
      );
      try {
        const updatedTodo = await Promise.all([updatedTodoItem, updatedTodoNote]).then(
          ([updatedTodoItem, updatedTodoNote]) => ({
            updatedTodoItem,
            updatedTodoNote,
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
        const updateItem = await TodoItem.findOneAndUpdate(queries(SCHEMA_TODO['todoItem']), body, {
          new: true,
          runValidators: true,
        });
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
      const deleteItem = await TodoItem.findOneAndDelete(queries(SCHEMA_TODO['todoItem']), {
        session,
      });
      const deleteNote = await TodoNote.findOneAndDelete(queries(SCHEMA_TODO['todoNote']), {
        session,
      });

      try {
        const deletedTodo = await Promise.all([deleteItem, deleteNote]).then(
          ([deletedItem, deletedNote]) => ({
            deletedItem,
            deletedNote,
          }),
        );
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
