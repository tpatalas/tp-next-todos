import { Labels } from '@lib/types';
import { fetchWithRetry } from '@states/utils/hooks';

const apiLabels = process.env.NEXT_PUBLIC_API_ENDPOINT_LABELS as string;

export const getDataLabels = async () => {
  const response = await fetchWithRetry(apiLabels);
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const getDataLabelItem = async (_id: Labels['_id']) => {
  const response = await fetchWithRetry(`${apiLabels}/${_id}`);
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const createDataNewLabel = async (inputValue: Labels) => {
  const response = await fetchWithRetry(apiLabels, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputValue),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataLabels = async (inputValue: Labels[]) => {
  const response = await fetchWithRetry(apiLabels, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputValue),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataLabelItem = async (_id: Labels['_id'], inputValue: Labels) => {
  const response = await fetchWithRetry(`${apiLabels}/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputValue),
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
