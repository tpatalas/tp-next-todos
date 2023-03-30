import { DATA_DEMO_LABELS } from '@collections/demo';
import { PATH_HOME } from '@constAssertions/data';
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
    return pathname === PATH_HOME['demo'] ? get(atomDemoLabels) : get(atomQueryLabels);
  },
  set: ({ get, set }, newValue) => {
    const pathname = get(atomPathname);
    return pathname === PATH_HOME['demo']
      ? set(atomDemoLabels, newValue)
      : set(atomQueryLabels, newValue);
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
