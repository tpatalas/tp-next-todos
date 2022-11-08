import { Todos } from '@lib/types';
import { selectorPriorityRankScore } from '@states/atoms/atomPrs';
import { atomSelectorTodoItem, atomTodoNew } from '@states/atoms/atomTodos';
import { RecoilValue, useRecoilCallback } from 'recoil';

/**
 * PRS = Priority Rank Score
 */

export const usePriorityRankScore = (todoId: Todos['_id']) => {
  return useRecoilCallback(({ set, snapshot }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();

    typeof todoId === 'undefined'
      ? set(atomTodoNew, {
          ...get(atomTodoNew),
          priorityRankScore: get(selectorPriorityRankScore(undefined)),
        })
      : set(atomSelectorTodoItem(todoId), {
          ...get(atomSelectorTodoItem(todoId)),
          priorityRankScore: get(selectorPriorityRankScore(todoId)),
        });
  });
};
