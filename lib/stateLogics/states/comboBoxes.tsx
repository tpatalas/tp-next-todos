import { TypesTodos } from '@components/todos/todos.types';
import { atom, atomFamily } from 'recoil';

/**
 * Atoms
 **/

// ComboBox
export const atomComboBoxQuery = atom<string>({
  key: 'atomComboBoxQuery',
  default: '',
});

export const atomFilterSelected = atomFamily<boolean, TypesTodos['_id']>({
  key: 'atomFilterSelected',
  default: false,
});
