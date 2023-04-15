import { PATH_IMAGE_APP } from '@constAssertions/data';
import { CATCH } from '@constAssertions/misc';
import { SPINNER } from '@constAssertions/ui';
import { atom, atomFamily, selector } from 'recoil';

/*
 * Atoms
 * */

export const atomCatch = atomFamily<boolean, CATCH>({
  key: 'atomCatch',
  default: false,
});

export const atomDisableScroll = atom<boolean>({
  key: 'atomDisableScroll',
  default: false,
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

export const atomPathnameImage = atom<PATH_IMAGE_APP>({
  key: 'atomPathnameImage',
  default: PATH_IMAGE_APP['focus'],
});

export const atomLoadingSpinner = atomFamily<boolean, SPINNER>({
  key: 'atomLoadingSpinner',
  default: false,
});

export const atomFilterEffect = atom({
  key: 'atomFilterEffect',
  default: 'focus',
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
