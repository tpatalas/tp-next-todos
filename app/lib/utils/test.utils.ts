import { ReactNode } from 'react';

export const getResolvedComponent = async (Component: (props: unknown) => Promise<ReactNode>, props = {}) => {
  const ComponentResolved = await Component(props);
  return () => ComponentResolved;
};
