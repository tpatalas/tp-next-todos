import { Users } from '@lib/types';

const apiUsers = process.env.NEXT_PUBLIC_API_ENDPOINT_USERS as string;

export const createDataNewUser = async (data: Users) => {
  const response = await fetch(apiUsers, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};
