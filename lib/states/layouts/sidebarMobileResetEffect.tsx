import { BREAKPOINT, CATCH_MODAL } from '@data/stateObjects';
import { atomSidebarOpenMobile } from '@states/layouts/states';
import { atomMediaQuery } from '@states/misc/states';
import { atomCatch } from '@states/utils/states';
import { useEffect } from 'react';
import { RecoilValue, useRecoilCallback, useRecoilValue } from 'recoil';

export const SidebarMobileResetEffect = () => {
  const isTodoModalOpen = useRecoilValue(
    atomCatch(CATCH_MODAL['todoModal']) || CATCH_MODAL['confirmModal'],
  );
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
