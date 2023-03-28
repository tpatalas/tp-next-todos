import { BREAKPOINT } from '@constAssertions/ui';
import { mediaQueryEffect } from '@lib/stateLogics/effects/atomEffects/atomEffects';
import { atomMediaQuery } from '@states/misc';
import { atom, selector } from 'recoil';

/**
 * Atoms
 **/
export const atomSidebarOpen = atom({
  key: 'atomSidebarOpen',
  default: true,
  effects: [mediaQueryEffect({ breakpoint: BREAKPOINT['md'] })],
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
    return breakpointMedium ? get(atomSidebarOpen) : get(atomSidebarOpenMobile);
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});
