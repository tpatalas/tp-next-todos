import { useLayoutBodyTagClass } from '@layout/layout.hooks';
import { TypesLayout } from '@layout/layout.types';
import { useEffect } from 'react';

export const BodyTagClassEffect = ({ path }: Pick<TypesLayout, 'path'>) => {
  const setBodyTagClass = useLayoutBodyTagClass({ path: path });

  useEffect(() => {
    setBodyTagClass();
  }, [setBodyTagClass]);

  return null;
};
