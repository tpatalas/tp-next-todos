import { DATA_DEMO_LABELS } from '@collections/demo';
import { PATH_APP } from '@constAssertions/data';
import { IDB_KEY, IDB_STORE } from '@constAssertions/storage';
import { getDataLabels } from '@lib/queries/queryLabels';
import { queryEffect } from '@lib/stateLogics/effects/atomEffects/queryEffects';
import { Labels } from '@lib/types';
import { atomPathname } from '@states/misc';
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
    const pathname = get(atomPathname);
    return pathname === PATH_APP['app'] ? get(atomQueryLabels) : get(atomDemoLabels);
  },
  set: ({ get, set }, newValue) => {
    const pathname = get(atomPathname);
    return pathname === PATH_APP['app']
      ? set(atomQueryLabels, newValue)
      : set(atomDemoLabels, newValue);
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
