import { Todos, Labels, Types } from '@lib/types';
import { atomLabelNew, atomQueryLabels, atomSelectorLabelItem } from '@states/labels';
import { atomTodoModalOpen, atomTodoModalMini } from '@states/modals';
import { atomTodoNew, atomSelectorTodoItem } from '@states/todos';
import { atomQueryTodoItem } from '@states/todos/atomQueries';
import equal from 'fast-deep-equal/react';
import { useEffect } from 'react';
import { useRecoilCallback, RecoilValue, useRecoilValue, RecoilState } from 'recoil';

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
  const todoItemCompletedEqual = equal(todoItem.isCompleted, selectorTodoItem.isCompleted);
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

// recoil test observer: required to observe state change on unit test
export const RecoilObserver = <T,>({
  node,
  onChange,
}: {
  node: RecoilState<T>;
  onChange: Types['onChange'];
}) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};
