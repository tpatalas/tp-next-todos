import { Labels } from '@lib/types';

export const getDataLabels = async () => {
  const response = await fetch(`/api/v1/labels`);
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const getDataLabelItem = async (_id: Labels['_id']) => {
  const response = await fetch(`/api/v1/labels/${_id}`);
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const createDataNewLabel = async (inputValue: Labels) => {
  const response = await fetch(`/api/v1/labels`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputValue),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataLabelItem = async (_id: Labels['_id'], inputValue: Labels) => {
  const response = await fetch(`/api/v1/labels/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputValue),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const deleteDataLabelItem = async (_id: Labels['_id']) => {
  const response = await fetch(`/api/v1/labels/${_id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};
