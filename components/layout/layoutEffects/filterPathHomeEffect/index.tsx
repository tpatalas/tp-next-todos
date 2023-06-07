import { useFilterPathHome } from '@layout/layout.hooks';
import { useEffect } from 'react';

export const FilterPathHomeEffect = () => {
  const filterPathHome = useFilterPathHome();

  useEffect(() => {
    filterPathHome();
  }, [filterPathHome]);

  return null;
};
