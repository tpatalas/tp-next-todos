import { CATCH_MODAL } from '@data/stateObjects';
import { atomFamily, atom } from 'recoil';

/**
 * Atoms
 */
export const atomCatch = atomFamily<boolean, CATCH_MODAL>({
  key: 'atomCatch',
  default: false,
});

export const atomDisableScroll = atom<boolean>({
  key: 'atomDisableScroll',
  default: false,
});
