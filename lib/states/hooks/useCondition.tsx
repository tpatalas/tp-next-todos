import { CONDITION } from '@data/stateObjects';
import { Todos } from '@lib/types';
import { atomTodoModalMini, atomTodoModalOpen } from '@states/atoms';
import { atomQueryTodoItem } from '@states/atoms/atomQuery';
import { atomSelectorTodoItem, atomTodoNew } from '@states/atoms/atomTodos';
import equal from 'fast-deep-equal/react';
import { RecoilValue, useRecoilSnapshot } from 'recoil';

/**
 * Conditional Check
 *
 * Description: These hooks are using `useRecoilSnapshot` intentionally to trigger re-render
 * the component. As useRecoilCallback or useRecoilTransaction does not trigger any re-rendering
 * useRecoilSnap is the right hook to check the state of atom.
 */

export const useConditionCheckCreateModalOpen = () => {
  const snapshot = useRecoilSnapshot();
  const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
  return get(atomTodoModalOpen(undefined)) || get(atomTodoModalMini(undefined));
};

export const useConditionCheckTodoTitleEmpty = () => {
  const snapshot = useRecoilSnapshot();
  const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
  return typeof get(atomTodoNew).title === 'undefined' || get(atomTodoNew).title.trim() === '';
};

export const useConditionCompareTodoItemsEqual = (_id: Todos['_id']) => {
  const snapshot = useRecoilSnapshot();
  const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
  if (typeof _id === 'undefined') return;
  return equal(get(atomQueryTodoItem(_id)), get(atomSelectorTodoItem(_id)));
};

export const useConditionalCheckState = (_id: Todos['_id']) => {
  const checkCreateModalOpen = useConditionCheckCreateModalOpen();
  const checkTodoTitleEmpty = useConditionCheckTodoTitleEmpty();
  const compareTodoItemsEqual = useConditionCompareTodoItemsEqual(_id);
  return (state: CONDITION) => {
    switch (state) {
      case CONDITION['checkCreateModalOpen']:
        return checkCreateModalOpen;
      case CONDITION['checkTodoTitleEmpty']:
        return checkTodoTitleEmpty;
      case CONDITION['compareTodoItemsEqual']:
        return compareTodoItemsEqual;
    }
  };
};
