import { BREAKPOINT } from '@constAssertions/ui';
import { atomMediaQuery } from '@states/misc';
import { atom, selector } from 'recoil';

/**
 * Atoms
 **/
export const atomSidebarInitialOpen = atom({
  key: 'atomSidebarInitialOpen',
  default: false,
});

export const atomSidebarOpenMobile = atom({
  key: 'atomSidebarOpenMobile',
  default: false,
});

export const atomSidebarOpenSetting = atom({
  key: 'atomSidebarOpenSetting',
  default: false,
});

export const atomSearchInput = atom({
  key: 'atomSearchInput',
  default: '',
});

/**
 * Selector
 **/
export const selectorSidebarOpen = selector({
  key: 'selectorSidebarOpen',
  get: ({ get }) => {
    const breakpointMedium = get(atomMediaQuery(BREAKPOINT['md']));
    if (get(atomSidebarOpenSetting) && breakpointMedium) return get(atomSidebarOpenSetting) ? false : true;
    return breakpointMedium ? get(atomSidebarInitialOpen) : get(atomSidebarOpenMobile);
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});
