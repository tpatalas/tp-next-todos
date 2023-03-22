import { DATA_DEMO_LABELS } from '@data/dataDemo';
import { IDB_KEY, IDB_STORE } from '@data/dataTypesConst';
import { queryEffect } from '@effects/queryEffects';
import { getDataLabels } from '@lib/queries/queryLabels';
import { Labels } from '@lib/types';
import { atomUserSession } from '@states/users';
import { atom, selector } from 'recoil';

/**
 * Atom Queries
 **/
export const atomQueryLabels = atom<Labels[]>({
  key: 'atomQueryLabels',
  default: [],
  effects: [
    queryEffect({
      storeName: IDB_STORE['idMaps'],
      queryKey: IDB_KEY['labels'],
      queryFunction: () => getDataLabels(),
      isRefetchingOnMutation: true, // fetching the list of labels is too expensive.
    }),
  ],
});

export const atomDemoLabels = atom<Labels[]>({
  key: 'atomDemoLabels',
  default: DATA_DEMO_LABELS,
});

export const selectorSessionLabels = selector<Labels[]>({
  key: 'selectorSessionLabels',
  get: ({ get }) => {
    const session = get(atomUserSession);
    return session ? get(atomQueryLabels) : get(atomDemoLabels);
  },
  set: ({ get, set }, newValue) => {
    const session = get(atomUserSession);
    return session ? set(atomQueryLabels, newValue) : set(atomDemoLabels, newValue);
  },
});

export const atomSelectorLabels = atom({
  key: 'atomSelectorLabels',
  default: selector({
    key: 'selectorAtomSelectorLabels',
    get: ({ get }) => get(selectorSessionLabels),
    cachePolicy_UNSTABLE: {
      eviction: 'most-recent',
    },
  }),
});
