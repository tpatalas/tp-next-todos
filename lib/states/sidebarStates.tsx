import { BREAKPOINT } from '@data/stateObjects';
import { mediaQueryEffect } from '@effect/atomEffects';
import { atom, RecoilValue, selector, useRecoilCallback } from 'recoil';
import { atomMediaQuery } from './miscStates';

/**
 * Atoms
 **/
export const atomSidebarOpen = atom({
  key: 'atomSidebarOpen',
  default: true,
  effects: [
    mediaQueryEffect({
      breakpoint: BREAKPOINT['md'],
      stateUnderBreakpoint: false,
      stateOverBreakpoint: true,
    }),
  ],
});

export const atomSidebarOpenMobile = atom({
  key: 'atomSidebarOpenMobile',
  default: false,
});

export const atomSidebarOpenSetting = atom({
  key: 'atomSidebarOpenSetting',
  default: false,
});

/**
 * Selector
 **/
export const selectorSidebarOpen = selector({
  key: 'selectorSidebarOpen',
  get: ({ get }) => {
    const breakpointMedium = get(atomMediaQuery(BREAKPOINT['md']));
    if (get(atomSidebarOpenSetting) && breakpointMedium)
      return get(atomSidebarOpenSetting) ? false : true;
    return breakpointMedium ? get(atomSidebarOpen) : get(atomSidebarOpenMobile);
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

/**
 * Hooks
 **/

export const useSidebarOpen = () => {
  return useRecoilCallback(({ snapshot, set }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    // Under the mediaQuery meidum ('md') will return false and will return true over mediaQuery
    if (!get(atomMediaQuery(BREAKPOINT['md'])))
      return set(atomSidebarOpenMobile, (event) => !event);
    set(atomSidebarOpenSetting, (event) => !event);
  });
};
