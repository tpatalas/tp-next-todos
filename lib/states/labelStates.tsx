import { Labels } from '@lib/types';
import { atom, selector } from 'recoil';
import { atomQueryLabels } from './atomQueries';

/*
 * Atom
 * */
export const atomLabelNew = atom<Labels>({
  key: 'atomLabelNew',
  default: {
    _id: undefined,
    name: '',
    title_id: undefined,
    parent_id: undefined,
  } as Labels,
});

export const atomSelectorLabels = atom<Labels[]>({
  key: 'atomSelectorLabels',
  default: selector({
    key: 'selectorAtomTodoItem',
    get: ({ get }) => get(atomQueryLabels),
  }),
});
