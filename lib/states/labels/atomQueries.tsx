import { DATA_DEMO_LABELS } from '@data/dataDemo';
import { IDB_KEY, IDB_STORE } from '@data/dataTypesConst';
import { queryEffect } from '@effects/queryEffects';
import { getDataLabels } from '@lib/queries/queryLabels';
import { Labels } from '@lib/types';
import { atom, selector } from 'recoil';

/**
 * Atom Queries
 **/
export const atomQueryLabels = atom<Labels[]>({
  key: 'atomQueryLabels',
  default: DATA_DEMO_LABELS,
  effects: [
    queryEffect({
      storeName: IDB_STORE['idMaps'],
      queryKey: IDB_KEY['labels'],
      queryFunction: () => getDataLabels(),
      isRefetchingOnMutation: true, // fetching the list of labels is too expensive.
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
