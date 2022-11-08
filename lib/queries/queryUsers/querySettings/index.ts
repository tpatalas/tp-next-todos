import { Settings, Users } from '@lib/types';

export const getDataSetting = async (_id: Users['_id']) => {
  const response = await fetch(`/api/v1/users/settings?userId=${_id}`);
  return await response.json();
};

export const createDataNewSetting = async (inputValue: Settings) => {
  const response = await fetch('/api/v1/users/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputValue),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataSetting = async (_id: Settings['_id'], inputValue: Settings) => {
  const response = await fetch(`/api/v1/users/settings/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputValue),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const deleteDataSetting = async (_id: Settings['_id']) => {
  const response = await fetch(`/api/v1/users/settings/${_id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataTaskCapacityPerDaySetting = async (
  _id: Settings['_id'],
  taskCapacity: Settings['taskCapacityPerDay'],
) => {
  const response = await fetch(`/api/v1/users/settings/${_id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskCapacityPerDay: taskCapacity }),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};
