import { PATH_APP } from '@constAssertions/data';
import { atomLabelNew, atomSelectorLabelItem, selectorSessionLabels } from '@label/label.states';
import { Labels, Todos } from '@lib/types';
import { atomSelectorTodoItem, selectorSessionTodoItem } from '@states/atomEffects/todos';
import { atomTodoModalMini, atomTodoModalOpen } from '@states/modals';
import { atomTodoNew, selectorFilterTodoIdsByPathname } from '@states/todos';
import equal from 'fast-deep-equal/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { RecoilValue, useRecoilCallback, useRecoilValue, useRecoilValueLoadable } from 'recoil';

export const useFilterTodoIdsWithPathname = () => {
  const router = useRouter();
  const app = useRecoilValue(selectorFilterTodoIdsByPathname(PATH_APP['app']));
  const urgent = useRecoilValue(selectorFilterTodoIdsByPathname(PATH_APP['urgent']));
  const important = useRecoilValue(selectorFilterTodoIdsByPathname(PATH_APP['important']));
  const showAll = useRecoilValue(selectorFilterTodoIdsByPathname(PATH_APP['showAll']));
  const completed = useRecoilValue(selectorFilterTodoIdsByPathname(PATH_APP['completed']));

  switch (router.asPath) {
    case PATH_APP['app']:
      return app;
    case PATH_APP['urgent']:
      return urgent;
    case PATH_APP['important']:
      return important;
    case PATH_APP['showAll']:
      return showAll;
    case PATH_APP['completed']:
      return completed;
    default:
      return app;
  }
};

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
  const todoItem = useRecoilValueLoadable(selectorSessionTodoItem(_id)).valueMaybe();
  const selectorTodoItem = useRecoilValueLoadable(atomSelectorTodoItem(_id)).valueMaybe();
  if (typeof _id === 'undefined') return;
  const todoItemCompletedEqual = equal(todoItem?.completed, selectorTodoItem?.completed);
  // Disable update button if completed
  return !todoItemCompletedEqual ? true : equal(todoItem, selectorTodoItem);
};

export const useConditionCompareLabelItemsEqual = (_id: Labels['_id']) => {
  const labels = useRecoilValue(selectorSessionLabels);
  const labelItem = labels.find((label) => label._id === _id) || ({} as Labels);
  const labelItemCompare = useRecoilValue(atomSelectorLabelItem(_id));
  if (typeof _id == 'undefined') return;
  return equal(labelItem, labelItemCompare);
};

export const useNextQuery = ({ path, key }: { path?: string; key?: string }) => {
  if ((path && key) || (!path && !key)) throw new Error('Only "path" or "key" can be provided');
  const router = useRouter();
  const pathRegex = path && `${path}/(.*)(&|$)`;
  const keyRegex = key && `[&?]${key}=(.*?)(&|$)`;
  const pathOrKey = (pathRegex || keyRegex) as string;

  const value = useMemo(() => {
    if (path && router.pathname === path) {
      return path;
    }

    const match = router.asPath.match(new RegExp(pathOrKey));
    if (!match) return undefined;
    return decodeURIComponent(match[1]);
  }, [path, pathOrKey, router.asPath, router.pathname]);

  return value;
};

export const useCompareToQueryLabels = () => {
  return useRecoilCallback(({ snapshot }) => (compare: Labels[]) => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    return compare.filter((label) => {
      return !get(selectorSessionLabels).find((queryLabel) => equal(label, queryLabel));
    });
  });
};
