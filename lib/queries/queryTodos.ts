import { Todos, Types } from '@lib/types';
import { queries } from '@lib/utils';

export const getDataTodoIds = async ({
  model,
  completed,
  completedDaysFromToday,
}: Partial<Pick<Types, 'completed' | 'completedDaysFromToday'>> & Pick<Types, 'model'>) => {
  const response = await fetch(
    '/api/v1/todos?' +
      queries(
        'model=' + model,
        typeof completed !== 'undefined' && 'completed=' + completed,
        typeof completedDaysFromToday !== 'undefined' &&
          'completedDaysFromToday=' + completedDaysFromToday,
      ),
  );
  return await response.json();
};

export const getDataTodoItem = async ({ _id }: Pick<Types, '_id'>) => {
  const response = await fetch(`/api/v1/todos/${_id}`);
  return await response.json();
};

export const createDataNewTodo = async (inputValue: Todos) => {
  const response = await fetch('/api/v1/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputValue),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const deleteDataTodo = async (_id: Todos['_id']) => {
  const response = await fetch(`/api/v1/todos/${_id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataTodo = async (_id: Todos['_id'], inputValue: Todos) => {
  const response = await fetch(`/api/v1/todos/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputValue),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const completeDataTodo = async (
  _id: Todos['_id'],
  completed: Todos['completed'],
  completedDate: Todos['completedDate'],
) => {
  const response = await fetch(`/api/v1/todos/${_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: completed, completedDate: completedDate }),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataCalendarTodo = async (
  _id: Todos['_id'],
  dueDate: Todos['dueDate'],
  priorityRankScore: Todos['priorityRankScore'],
) => {
  const response = await fetch(`/api/v1/todos/${_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dueDate: dueDate, priorityRankScore: priorityRankScore }),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataPriorityTodo = async (
  _id: Todos['_id'],
  priority: Todos['priorityLevel'],
  priorityRankScore: Todos['priorityRankScore'],
) => {
  const response = await fetch(`/api/v1/todos/${_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      priorityLevel: priority,
      priorityRankScore: priorityRankScore,
    }),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};
