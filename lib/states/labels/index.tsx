import { IDB_STORE } from '@data/stateObjects';
import { queryEffect } from '@effects/queryEffects';
import { getDataLabels } from '@lib/queries/queryLabels';
import { Labels } from '@lib/types';
import { atom, atomFamily, selectorFamily } from 'recoil';

/**
 * Atom Queries
 **/
export const atomQueryLabels = atom<Labels[]>({
  key: 'atomQueryLabels',
  effects: [
    queryEffect({
      storeName: IDB_STORE['labels'],
      queryKey: 'labels',
      queryFunction: () => getDataLabels(),
      isRefetchingOnMutation: false, // fetching the list of labels is too expensive.
    }),
  ],
});

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

export const atomSelectorLabelItem = atomFamily<Labels, Labels['_id']>({
  key: 'atomSelectorLabelItem',
  default: selectorFamily({
    key: 'selectorLabelItem',
    get:
      (label_id) =>
      ({ get }) =>
        get(atomQueryLabels).find((label) => label._id === label_id) || ({} as Labels),
  }),
});
