import { BREAKPOINT } from '@constAssertions/ui';
import { Types } from '@lib/types';
import { atomMediaQuery } from '@states/misc';
import { atom, atomFamily, selector } from 'recoil';

/**
 * Atoms
 **/
export const atomNavigationInitialOpen = atomFamily<boolean, Types['layoutType']>({
  key: 'atomNavigationInitialOpen',
  default: false,
});

export const atomNavigationOpenMobile = atomFamily<boolean, Types['layoutType']>({
  key: 'atomNavigationOpenMobile',
  default: false,
});

export const atomNavigationOpenSetting = atomFamily<boolean, Types['layoutType']>({
  key: 'atomNavigationOpenSetting',
  default: false,
});

export const atomSearchInput = atom({
  key: 'atomSearchInput',
  default: '',
});

export const atomLayoutType = atom<Types['layoutType']>({
  key: 'atomLayoutType',
  default: 'app',
});

/**
 * Selector
 **/
export const selectorNavigationOpen = selector({
  key: 'selectorNavigationOpen',
  get: ({ get }) => {
    const layoutType = get(atomLayoutType);
    const breakpointMedium =
      layoutType === 'app' ? get(atomMediaQuery(BREAKPOINT['md'])) : get(atomMediaQuery(BREAKPOINT['ml']));
    if (get(atomNavigationOpenSetting(layoutType)) && breakpointMedium)
      return get(atomNavigationOpenSetting(layoutType)) ? false : true;
    return breakpointMedium ? get(atomNavigationInitialOpen(layoutType)) : get(atomNavigationOpenMobile(layoutType));
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});
