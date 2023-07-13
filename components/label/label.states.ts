import { IDB_KEY, IDB_STORE } from '@constAssertions/storage';
import { getDataLabels } from '@lib/queries/queryLabels';
import { queryEffect } from '@lib/stateLogics/effects/atomEffects/queryEffects';
import { atomComboBoxQuery, atomFilterSelected } from '@states/comboBoxes';
import { atomTodoNew } from '@states/todos';
import { atomUserSession } from '@user/user.states';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { Labels } from './label.types';
import { DATA_DEMO_LABELS } from './label.data';
import { TypesTodos } from '@components/todos/todos.types';

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

/*
 * Atom
 * */
export const atomLabelNew = atom<Labels>({
  key: 'atomLabelNew',
  default: {
    _id: undefined,
    name: '',
    color: '',
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
        get(selectorSessionLabels).find((label) => label._id === label_id) || ({} as Labels),
  }),
});

export const atomLabelQuerySlug = atom<Labels['_id']>({
  key: 'atomLabelQuerySlug',
  default: undefined,
});

/**
 * Selectors
 **/
export const selectorSelectedLabels = selectorFamily<Labels[], TypesTodos['_id']>({
  key: 'selectorSelectedLabels',
  get:
    (_id) =>
    ({ get }) => {
      const todoId = _id ? _id! : get(atomTodoNew)._id!;
      return get(atomSelectorLabels).filter((label) => label.title_id && label.title_id.includes(todoId));
    },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

export const selectorSelectedQueryLabels = selectorFamily<Labels[], TypesTodos['_id']>({
  key: 'selectorSelectedLabels',
  get:
    (_id) =>
    ({ get }) => {
      const todoId = _id ? _id! : get(atomTodoNew)._id!;
      return get(selectorSessionLabels).filter((label) => label.title_id && label.title_id.includes(todoId));
    },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

export const selectorComboBoxFilteredLabels = selectorFamily<Labels[], TypesTodos['_id']>({
  key: 'selectorComboBoxFilteredLabels',
  get:
    (todoId) =>
    ({ get }) => {
      const query = get(atomComboBoxQuery);
      const labels = get(atomSelectorLabels);
      const isFiltered = get(atomFilterSelected(todoId));
      const filteredLabels =
        query === ''
          ? labels
          : labels.filter((label) =>
              label.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')),
            );
      const selectedFilteredLabels = [...filteredLabels].filter((label) => {
        return label.title_id && label.title_id.includes(todoId!);
      });
      return isFiltered ? selectedFilteredLabels : filteredLabels;
    },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});
