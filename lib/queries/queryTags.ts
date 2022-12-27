import { Tags } from '@lib/types';

export const getDataTags = async () => {
  const response = await fetch(`/api/v1/tags`);
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const getDataTagItem = async (_id: Tags['_id']) => {
  const response = await fetch(`/api/v1/tags/${_id}`);
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const createDataTagItem = async (inputValue: Tags) => {
  const response = await fetch(`/api/v1/tags`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputValue),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateDataTagItem = async (_id: Tags['_id'], inputValue: Tags) => {
  const response = await fetch(`/api/v1/tags/${_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputValue),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const deleteDataTagItem = async (_id: Tags['_id']) => {
  const response = await fetch(`/api/v1/tags/${_id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};
