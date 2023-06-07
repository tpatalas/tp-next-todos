import { useFilterPathApp } from '@layout/layout.hooks';
import { useEffect } from 'react';

export const FilterPathAppEffect = () => {
  const filterPathApp = useFilterPathApp();

  useEffect(() => {
    filterPathApp();
  }, [filterPathApp]);

  return null;
};
