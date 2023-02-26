import { STORAGE_KEY } from '@data/dataTypesConst';
import { Todos, Types } from '@lib/types';
import { fetchWithRetry, queries } from '@states/utils';

const apiTodos = process.env.NEXT_PUBLIC_API_ENDPOINT_TODOS as string;

export const getDataTodoIds = async () => {
  const storageKey = STORAGE_KEY['todoIds'];
  const lastUpdate = JSON.parse(localStorage.getItem(storageKey) || '0');
  const response = await fetchWithRetry(apiTodos + '?' + queries('update=' + lastUpdate));
  if (!response.ok) throw new Error(response.statusText);
  const { data, update } = await response.json();
  update && localStorage.setItem(storageKey, JSON.stringify(update));
  return { data };
};

export const getDataTodoItem = async ({ _id }: Pick<Types, '_id'>) => {
  const response = await fetchWithRetry(apiTodos + `/${_id}`);
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const createDataNewTodo = async (data: Todos) => {
  const response = await fetchWithRetry(apiTodos, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const deleteDataTodo = async (_id: Todos['_id']) => {
  const response = await fetchWithRetry(apiTodos + `/${_id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataTodo = async (_id: Todos['_id'], data: Todos) => {
  const response = await fetchWithRetry(apiTodos + `/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const completeDataTodo = async (
  _id: Todos['_id'],
  completed: Todos['completed'],
  completedDate: Todos['completedDate'],
) => {
  const response = await fetchWithRetry(apiTodos + `/${_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      completed: completed,
      completedDate: completedDate,
    }),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataCalendarTodo = async (
  _id: Todos['_id'],
  dueDate: Todos['dueDate'],
  priorityRankScore: Todos['priorityRankScore'],
) => {
  const response = await fetchWithRetry(apiTodos + `/${_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      dueDate: dueDate,
      priorityRankScore: priorityRankScore,
    }),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataPriorityTodo = async (
  _id: Todos['_id'],
  priority: Todos['priorityLevel'],
  priorityRankScore: Todos['priorityRankScore'],
) => {
  const response = await fetchWithRetry(apiTodos + `/${_id}`, {
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
