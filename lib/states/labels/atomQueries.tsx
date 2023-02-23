import { IDB_STORE } from '@data/dataTypesConst';
import { queryEffect } from '@effects/queryEffects';
import { getDataLabels } from '@lib/queries/queryLabels';
import { Labels } from '@lib/types';
import { atom, selector } from 'recoil';

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

export const atomSelectorLabels = atom({
  key: 'atomSelectorLabels',
  default: selector({
    key: 'selectorAtomSelectorLabels',
    get: ({ get }) => get(atomQueryLabels),
    cachePolicy_UNSTABLE: {
      eviction: 'most-recent',
    },
  }),
});
