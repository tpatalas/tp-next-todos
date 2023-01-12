import { CATCH_MODAL } from '@data/stateObjects';
import { Labels, Todos } from '@lib/types';
import equal from 'fast-deep-equal/react';
import { atom, atomFamily, RecoilValue, useRecoilCallback, useRecoilValue } from 'recoil';
import { atomQueryLabels, atomQueryTodoItem } from './atomQueries';
import { atomLabelNew, atomSelectorLabelItem } from './labelStates';
import { atomTodoModalMini, atomTodoModalOpen } from './modalStates';
import { atomSelectorTodoItem, atomTodoNew } from './todoStates';

/**
 * Atoms
 */
export const atomCatch = atomFamily<boolean, CATCH_MODAL>({
  key: 'atomCatch',
  default: false,
});

export const atomDisableScroll = atom<boolean>({
  key: 'atomDisableScroll',
  default: false,
});

/**
 * Hooks
 * */

export const useGetWithRecoilCallback = () => {
  return useRecoilCallback(({ snapshot }) => <T,>(p: RecoilValue<T>) => {
    return snapshot.getLoadable(p).getValue();
  });
};

// Conditional Check
// Description: These hooks are using `useRecoilSnapshot` intentionally to trigger re-render
// the component. As useRecoilCallback or useRecoilTransaction does not trigger any re-rendering
// useRecoilSnap is the right hook to check the state of atom.

export const useConditionCheckCreateModalOpen = () => {
  const todoModalOpen = useRecoilValue(atomTodoModalOpen(undefined));
  const todoModalMiniOpen = useRecoilValue(atomTodoModalMini(undefined));
  return todoModalOpen || todoModalMiniOpen;
};

export const useConditionCheckTodoTitleEmpty = () => {
  const newTodo = useRecoilValue(atomTodoNew);
  return typeof newTodo.title === 'undefined' || newTodo.title.trim() === '';
};

export const useConditionCheckLabelTitleEmpty = () => {
  const newTodo = useRecoilValue(atomLabelNew);
  return typeof newTodo.name === 'undefined' || newTodo.name.trim() === '';
};

export const useConditionCompareTodoItemsEqual = (_id: Todos['_id']) => {
  if (typeof _id === 'undefined') return;
  const todoItem = useRecoilValue(atomQueryTodoItem(_id));
  const selectorTodoItem = useRecoilValue(atomSelectorTodoItem(_id));
  const todoItemCompletedEqual = equal(todoItem.completed, selectorTodoItem.completed);
  // Disable update button if completed
  return !todoItemCompletedEqual ? true : equal(todoItem, selectorTodoItem);
};

export const useConditionCompareLabelItemsEqual = (_id: Labels['_id']) => {
  if (typeof _id === 'undefined') return;
  const labels = useRecoilValue(atomQueryLabels);
  const labelItem = labels.find((label) => label._id === _id) || ({} as Labels);
  const labelItemCompare = useRecoilValue(atomSelectorLabelItem(_id));
  return equal(labelItem, labelItemCompare);
};
