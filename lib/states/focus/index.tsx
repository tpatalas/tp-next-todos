import { atom } from 'recoil';

/**
 * Atoms
 */
export const atomOnBlur = atom({
  key: 'atomOnBlur',
  default: false,
});

export const atomOnFocus = atom({
  key: 'atomOnFocus',
  default: false,
});

export const atomCurrentFocus = atom({
  key: 'atomCurrentFocus',
  default: -1,
});
