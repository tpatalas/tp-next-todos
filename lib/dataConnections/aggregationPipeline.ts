import { TypesTodos } from '@components/todos/todos.types';
import mongoose, { PipelineStage } from 'mongoose';

export const aggregatedTodoItem = ({
  todoId,
  userId,
}: {
  todoId: TypesTodos['_id'];
  userId: TypesTodos['user_id'];
}): PipelineStage[] => {
  //   * Example:
  //   const getItem = await TodoItem.aggregate(
  //   aggregatedTodoNote({ todoId: todoId, userId: users._id }),
  // );

  return [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(`${todoId}`),
        user_id: new mongoose.Types.ObjectId(`${userId}`),
      },
    },
    { $sort: { _id: -1 } },
    { $limit: 1 },
    {
      $lookup: {
        from: 'todo-notes',
        localField: '_id',
        foreignField: 'title_id',
        as: 'note',
      },
    },
    {
      $unwind: { path: '$note', preserveNullAndEmptyArrays: true },
      // ! set to `false` on `preserveNullAndEmptyArrays` will fail to fetch if there is no record available. `preserveNullAndEmptyArrays` is false if no boolean is provided such as `$unwind:'$note'`
    },
    { $set: { note: '$note.note' } },
    {
      $project: {
        user_id: false,
        __v: false,
      },
    },
  ];
};
