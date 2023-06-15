import { BREAKPOINT } from '@constAssertions/ui';
import { TypesLayout } from '@layout/layout.types';
import { atomEffectMediaQuery } from '@states/atomEffects/misc';
import { atom, atomFamily, selector } from 'recoil';

/**
 * Atoms
 **/
export const atomLayoutNavigationOpen = atomFamily<boolean, TypesLayout['path']>({
  key: 'atomLayoutNavigationOpen',
  default: false,
});

export const atomLayoutSearch = atom({
  key: 'atomLayoutSearch',
  default: '',
});

export const atomLayoutType = atom<TypesLayout['path']>({
  key: 'atomLayoutType',
  default: 'app',
});

/**
 * Selector
 **/

export const selectorNavigationBreakpoint = selector({
  key: 'selectorNavigationBreakpoint',
  get: ({ get }) => {
    const layoutType = get(atomLayoutType);
    const breakpoint =
      layoutType === 'app'
        ? get(atomEffectMediaQuery(BREAKPOINT['md']))
        : get(atomEffectMediaQuery(BREAKPOINT['ml']));

    return breakpoint;
  },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});
