/*
 * Atoms
 * */

import { BREAKPOINT } from '@data/dataTypesObjects';
import { mediaQueryEffect, networkStatusEffect } from '@effects/atomEffects';
import { atomFamily, atom, selector } from 'recoil';

// Media Queries
export const atomMediaQuery = atomFamily<boolean, BREAKPOINT>({
  key: 'atomMediaQuery',
  default: false,
  effects: (breakpoint) => [
    mediaQueryEffect({
      breakpoint: breakpoint,
      isStateOverBreakpoint: true,
      isStateUnderBreakpoint: false,
    }),
  ],
});

// Network
export const atomNetworkStatusEffect = atom({
  key: 'atomNetworkStatusEffect',
  default: true,
  effects: [networkStatusEffect],
});

//  Dropdown
export const atomActiveMenuItemId = atom<string | null>({
  key: 'atomActiveMenuitemId',
  default: null,
});

export const atomActiveMenuItem = atomFamily<boolean, string | null>({
  key: 'atomActiveMenuItem',
  default: false,
  effects: (atomActiveMenuItemId) => [
    ({ setSelf }) => {
      atomActiveMenuItemId !== null && setSelf(true);
    },
  ],
});

export const selectorActiveMenuItem = selector({
  key: 'selectorActiveMenuItem',
  get: ({ get }) => {
    return get(atomActiveMenuItem(get(atomActiveMenuItemId)));
  },
});
