import { BREAKPOINT } from '@data/dataTypesObjects';
import { mediaQueryEffect, networkStatusEffect } from '@effects/atomEffects';
import { localStorageEffects } from '@effects/localStorageEffects';
import { atomFamily, atom, selector } from 'recoil';

/*
 * Atoms
 * */

// Update Effect
export const atomLocalStorageLastUpdate = atom<string | null>({
  key: 'atomUpdateEffect',
  default: null,
  effects: [
    localStorageEffects({
      storageKey: 'lastUpdate',
      storageValue: () => Date.now().toString(),
      isLocalStorageSetOnBeforeUnload: true,
      isLocalStorageSetOnBlur: true,
    }),
  ],
});

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

export const atomHtmlTitleTag = atom<string>({
  key: 'atomHtmlTitleTag',
  default: '',
});

/**
 * selector
 * */
export const selectorActiveMenuItem = selector({
  key: 'selectorActiveMenuItem',
  get: ({ get }) => {
    return get(atomActiveMenuItem(get(atomActiveMenuItemId)));
  },
});
