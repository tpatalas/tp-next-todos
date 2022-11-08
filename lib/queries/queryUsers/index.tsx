export const getDataUserId = async () => {
  const dummyUserId = '63583219c2cd1c54e452521f';
  const response = await fetch(`/api/v1/users?_id=${dummyUserId}`);
  return await response.json();
};
