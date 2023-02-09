import { Settings, Users } from '@lib/types';
import { queries } from '@states/utils';
import { fetchWithRetry } from '@states/utils/hooks';

const apiSettings = process.env.NEXT_PUBLIC_API_ENDPOINT_SETTINGS as string;

export const getDataSetting = async (_id: Users['_id']) => {
  const response = await fetchWithRetry(apiSettings + '?' + queries('userId=' + _id));
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const createDataNewSetting = async (inputValue: Settings) => {
  const response = await fetchWithRetry(apiSettings, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputValue),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataSetting = async (_id: Settings['_id'], inputValue: Settings) => {
  const response = await fetchWithRetry(queries(apiSettings + _id), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputValue),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const deleteDataSetting = async (_id: Settings['_id']) => {
  const response = await fetchWithRetry(queries(apiSettings + _id), {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataTaskCapacityPerDaySetting = async (
  _id: Settings['_id'],
  taskCapacity: Settings['taskCapacityPerDay'],
) => {
  const response = await fetchWithRetry(queries(apiSettings + _id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ taskCapacityPerDay: taskCapacity }),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};
