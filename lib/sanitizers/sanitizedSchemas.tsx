import { OBJECT_ID } from '@constAssertions/data';
import { Labels, Todos } from '@lib/types';
import { sanitize, sanitizeObject } from '@stateLogics/utils';

export const sanitizedUserTodoItem = (data: Todos) => {
  return {
    title: sanitize(data.title),
    completed: data.completed,
    completedDate: data.completedDate,
    dueDate: data.dueDate,
    createdDate: data.createdDate,
    priorityLevel: data.priorityLevel,
    priorityRankScore: data.priorityRankScore,
    update: Date.now(),
  };
};

export const sanitizedUserTodoNote = (data: Todos) => {
  return {
    note: sanitize(data.note),
    update: Date.now(),
  };
};

export const sanitizedUserLabels = (data: Todos['labelItem'] | Labels[]) => {
  return (
    data &&
    (data.map((labelItem) => {
      const sanitizedLabelItem = sanitizeObject(labelItem);
      const sanitizedTitleIds = labelItem.title_id?.map((id) => sanitize(id as string)) as OBJECT_ID[];
      return {
        ...sanitizedLabelItem,
        title_id: sanitizedTitleIds,
      };
    }) as Labels[])
  );
};
