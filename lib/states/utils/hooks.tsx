import { Labels, Todos, Types } from '@lib/types';
import { atomLabelNew, atomQueryLabels, atomSelectorLabelItem } from '@states/labels';
import { atomTodoModalMini, atomTodoModalOpen } from '@states/modals';
import { atomSelectorTodoItem, atomTodoNew } from '@states/todos';
import { atomQueryTodoItem } from '@states/todos/atomQueries';
import equal from 'fast-deep-equal/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { RecoilState, RecoilValue, useRecoilCallback, useRecoilValue } from 'recoil';

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

export const useNextQuerySlug = (path: string): string | undefined => {
  const router = useRouter();

  const value = useMemo(() => {
    const match = router.asPath.match(new RegExp(`${path}/(.*)(&|$)`));
    if (!match) return undefined;
    return decodeURIComponent(match[1]);
  }, [path, router]);

  return value;
};
