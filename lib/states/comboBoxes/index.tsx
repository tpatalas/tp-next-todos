import { Todos } from '@lib/types';
import { atom, atomFamily } from 'recoil';

/**
 * Atoms
 **/

// ComboBox
export const atomComboBoxQuery = atom<string>({
  key: 'atomComboBoxQuery',
  default: '',
});

export const atomFilterSelected = atomFamily<boolean, Todos['_id']>({
  key: 'atomFilterSelected',
  default: false,
});
