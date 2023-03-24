import { STORAGE_KEY } from '@constAssertions/storage';
import { Labels } from '@lib/types';
import { fetchWithRetry, queries } from '@stateLogics/utils';

const apiLabels = process.env.NEXT_PUBLIC_API_ENDPOINT_LABELS as string;

export const getDataLabels = async () => {
  const storageKey = STORAGE_KEY['labels'];
  const lastUpdate = JSON.parse(localStorage.getItem(storageKey) || '0');
  const response = await fetchWithRetry(apiLabels + '?' + queries('update=' + lastUpdate));
  if (!response.ok) throw new Error(response.statusText);
  const { data, update } = await response.json();
  update && localStorage.setItem(storageKey, JSON.stringify(update));
  return { data };
};

export const getDataLabelItem = async (_id: Labels['_id']) => {
  const response = await fetchWithRetry(`${apiLabels}/${_id}`);
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const createDataNewLabel = async (data: Labels) => {
  const response = await fetchWithRetry(apiLabels, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataLabels = async (data: Labels[]) => {
  const response = await fetchWithRetry(apiLabels, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataLabelItem = async (_id: Labels['_id'], data: Labels) => {
  const response = await fetchWithRetry(`${apiLabels}/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const deleteDataLabelItem = async (_id: Labels['_id']) => {
  const response = await fetchWithRetry(`${apiLabels}/${_id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};
