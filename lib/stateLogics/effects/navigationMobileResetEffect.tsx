import { atomCatch, atomMediaQuery } from '@states/misc';
import { useEffect } from 'react';
import { RecoilValue, useRecoilCallback, useRecoilValue } from 'recoil';
import { atomLayoutType, atomNavigationOpenMobile } from '@states/layouts';
import { CATCH } from '@constAssertions/misc';
import { BREAKPOINT } from '@constAssertions/ui';

export const NavigationMobileResetEffect = () => {
  const isTodoModalOpen = useRecoilValue(atomCatch(CATCH['todoModal']) || CATCH['confirmModal']);
  const resetSidebarOnMobileMediaQueries = useRecoilCallback(({ snapshot, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const layoutType = get(atomLayoutType);
    const breakpoint =
      layoutType === 'app' ? get(atomMediaQuery(BREAKPOINT['md'])) : get(atomMediaQuery(BREAKPOINT['ml']));
    isTodoModalOpen && reset(atomNavigationOpenMobile(layoutType));
    if (!breakpoint) return;
    reset(atomNavigationOpenMobile(layoutType));
  });

  useEffect(() => {
    resetSidebarOnMobileMediaQueries();
  }, [resetSidebarOnMobileMediaQueries]);

  return null;
};
