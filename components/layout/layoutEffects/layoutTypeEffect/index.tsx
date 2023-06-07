import { useLayoutType } from '@layout/layout.hooks';
import { TypesLayout } from '@layout/layout.types';
import { useEffect } from 'react';

export const LayoutTypeEffect = ({ path }: Pick<TypesLayout, 'path'>) => {
  const setLayoutType = useLayoutType({ path: path });

  useEffect(() => {
    setLayoutType();
  }, [setLayoutType]);

  return null;
};
