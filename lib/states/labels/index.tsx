import { IDB_STORE } from '@data/stateObjects';
import { queryEffect } from '@effects/queryEffects';
import { getDataLabels } from '@lib/queries/queryLabels';
import { Labels, Todos } from '@lib/types';
import { atomComboBoxQuery, atomFilterSelected } from '@states/comboBoxes';
import { atomTodoNew } from '@states/todos';
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

/**
 * Selectors
 **/
export const selectorSelectedLabels = selectorFamily<Labels[], Todos['_id']>({
  key: 'selectorSelectedLabels',
  get:
    (_id) =>
    ({ get }) => {
      const todoId = _id ? _id! : get(atomTodoNew)._id!;
      return get(atomQueryLabels).filter(
        (label) => label.title_id && label.title_id.includes(todoId),
      );
    },
  cachePolicy_UNSTABLE: {
    eviction: 'most-recent',
  },
});

export const selectorComboBoxFilteredLabels = selectorFamily<Labels[], Todos['_id']>({
  key: 'selectorComboBoxFilteredLabels',
  get:
    (todoId) =>
    ({ get }) => {
      const query = get(atomComboBoxQuery);
      const labels = get(atomQueryLabels);
      const isFiltered = get(atomFilterSelected(todoId));
      const filteredLabels =
        query === ''
          ? labels
          : labels.filter((label) =>
              label.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, '')),
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
