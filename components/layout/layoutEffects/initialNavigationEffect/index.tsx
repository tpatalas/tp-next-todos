import { useInitialNavigation } from '@layout/layout.hooks';
import { TypesLayout } from '@layout/layout.types';
import { useEffect } from 'react';

export const InitialNavigationEffect = ({ path }: Pick<TypesLayout, 'path'>) => {
  const setNavigation = useInitialNavigation({ path: path });

  useEffect(() => {
    setNavigation();
  }, [setNavigation]);

  return null;
};
