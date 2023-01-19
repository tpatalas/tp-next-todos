import { BREAKPOINT } from '@data/stateObjects';
import { atomMediaQuery } from '@states/misc';
import { useRecoilCallback, RecoilValue } from 'recoil';
import { atomSidebarOpenMobile, atomSidebarOpenSetting } from '.';

/**
 * Hooks
 **/

export const useSidebarOpen = () => {
  return useRecoilCallback(({ snapshot, set }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    // Under the mediaQuery medium ('md') will return false and will return true over mediaQuery
    if (!get(atomMediaQuery(BREAKPOINT['md'])))
      return set(atomSidebarOpenMobile, (event) => !event);
    set(atomSidebarOpenSetting, (event) => !event);
  });
};
