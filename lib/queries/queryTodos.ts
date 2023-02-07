import { Todos, Types } from '@lib/types';
import { queries } from '@states/utils';
import { fetchWithRetry } from '@states/utils/hooks';

export const getDataTodoIds = async ({
  model,
}: Partial<Pick<Types, 'completed' | 'completedFromToday' | 'priorityLevel'>> & Pick<Types, 'model'>) => {
  const response = await fetchWithRetry('/api/v1/todos?' + queries('model=' + model));
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const getDataTodoItem = async ({ _id }: Pick<Types, '_id'>) => {
  const response = await fetchWithRetry(`/api/v1/todos/${_id}`);
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const createDataNewTodo = async (inputValue: Todos) => {
  const response = await fetchWithRetry('/api/v1/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputValue),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const deleteDataTodo = async (_id: Todos['_id']) => {
  const response = await fetchWithRetry(`/api/v1/todos/${_id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataTodo = async (_id: Todos['_id'], inputValue: Todos) => {
  const response = await fetchWithRetry(`/api/v1/todos/${_id}`, {
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
  const response = await fetchWithRetry(`/api/v1/todos/${_id}`, {
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
  const response = await fetchWithRetry(`/api/v1/todos/${_id}`, {
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
  const response = await fetchWithRetry(`/api/v1/todos/${_id}`, {
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
