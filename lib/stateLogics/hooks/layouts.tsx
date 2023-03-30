import { atomMediaQuery } from '@states/misc';
import { useRecoilCallback, RecoilValue } from 'recoil';
import { BREAKPOINT } from '@constAssertions/ui';
import { atomLayoutType, atomNavigationOpenMobile, atomNavigationOpenSetting } from '@states/layouts';

/**
 * Hooks
 **/

export const useNavigationOpen = () => {
  return useRecoilCallback(({ snapshot, set }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const layoutType = get(atomLayoutType);
    const breakpoint =
      layoutType === 'app' ? get(atomMediaQuery(BREAKPOINT['md'])) : get(atomMediaQuery(BREAKPOINT['ml']));

    // Under the mediaQuery medium ('md') will return false and will return true over mediaQuery
    if (!breakpoint) return set(atomNavigationOpenMobile(layoutType), (event) => !event);
    set(atomNavigationOpenSetting(layoutType), (event) => !event);
  });
};
