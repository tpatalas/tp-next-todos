import { useInitialNavigation } from '@layout/layout.hooks';
import { atomLayoutType } from '@states/layouts';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export const InitialNavigationEffect = () => {
  const layoutType = useRecoilValue(atomLayoutType);
  const setNavigation = useInitialNavigation({ path: layoutType });

  useEffect(() => {
    setNavigation();
  }, [setNavigation]);

  return null;
};
