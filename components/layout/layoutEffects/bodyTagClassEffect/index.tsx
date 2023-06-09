import { useLayoutBodyTagClass } from '@layout/layout.hooks';
import { atomLayoutType } from '@states/layouts';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export const BodyTagClassEffect = () => {
  const layoutType = useRecoilValue(atomLayoutType);
  const setBodyTagClass = useLayoutBodyTagClass({ path: layoutType });

  useEffect(() => {
    setBodyTagClass();
  }, [setBodyTagClass]);

  return null;
};
