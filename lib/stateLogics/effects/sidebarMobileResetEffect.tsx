import { atomCatch, atomMediaQuery } from '@states/misc';
import { useEffect } from 'react';
import { RecoilValue, useRecoilCallback, useRecoilValue } from 'recoil';
import { atomSidebarOpenMobile } from '@states/layouts';
import { CATCH } from '@constAssertions/misc';
import { BREAKPOINT } from '@constAssertions/ui';

export const SidebarMobileResetEffect = () => {
  const isTodoModalOpen = useRecoilValue(atomCatch(CATCH['todoModal']) || CATCH['confirmModal']);
  const resetSidebarOnMobileMediaQueries = useRecoilCallback(({ snapshot, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    isTodoModalOpen && reset(atomSidebarOpenMobile);
    if (!get(atomMediaQuery(BREAKPOINT['md']))) return;
    reset(atomSidebarOpenMobile);
  });

  useEffect(() => {
    resetSidebarOnMobileMediaQueries();
  }, [resetSidebarOnMobileMediaQueries]);

  return null;
};
