import { Labels, Todos } from '@lib/types';
import { atomComboBoxQuery, atomFilterSelected } from '@states/comboBoxes';
import { atomTodoNew } from '@states/todos';
import { atom, atomFamily, selectorFamily } from 'recoil';
import { selectorSessionLabels, atomSelectorLabels } from './atomEffects/labels';

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
export const selectorSelectedLabels = selectorFamily<Labels[], Todos['_id']>({
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

export const selectorSelectedQueryLabels = selectorFamily<Labels[], Todos['_id']>({
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

export const selectorComboBoxFilteredLabels = selectorFamily<Labels[], Todos['_id']>({
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
