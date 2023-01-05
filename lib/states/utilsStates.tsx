import { CATCH_MODAL, CONDITION } from '@data/stateObjects';
import { Todos } from '@lib/types';
import equal from 'fast-deep-equal/react';
import { atomFamily, RecoilValue, useRecoilCallback, useRecoilValue } from 'recoil';
import { atomQueryTodoItem } from './atomQueries';
import { atomTodoModalMini, atomTodoModalOpen } from './modalStates';
import { atomSelectorTodoItem, atomTodoNew } from './todoStates';

/**
 * Atoms
 */
export const atomCatch = atomFamily<boolean, CATCH_MODAL>({
  key: 'atomCatch',
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

export const useConditionCompareTodoItemsEqual = (_id: Todos['_id']) => {
  if (typeof _id === 'undefined') return;
  const todoItem = useRecoilValue(atomQueryTodoItem(_id));
  const selectorTodoItem = useRecoilValue(atomSelectorTodoItem(_id));
  return equal(todoItem, selectorTodoItem);
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
