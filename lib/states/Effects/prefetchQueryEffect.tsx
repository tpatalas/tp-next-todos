import {
  atomQueryTags,
  atomQueryTodoIds,
  atomQueryTodoIdsCompleted,
  atomQueryTodoIdsPriorityLevel,
} from '@atomQueries/index';
import { PRIORITY_LEVEL } from '@data/stateObjects';
import { atomSelectorTodoIdsCompleted } from '@states/todoStates';
import { useEffect } from 'react';
import { useRecoilCallback, waitForAll } from 'recoil';

// The prefetchQueryEffect should be placed of parent component or it will trigger
// double fetches.
export const PrefetchQueryEffect = () => {
  const prefetchQuery = useRecoilCallback(({ snapshot, set }) => async () => {
    const [todoIdsCompleted] = await snapshot.getPromise(
      waitForAll([
        atomQueryTodoIdsCompleted,
        atomQueryTodoIds,
        atomQueryTodoIdsPriorityLevel(PRIORITY_LEVEL['urgent']),
        atomQueryTodoIdsPriorityLevel(PRIORITY_LEVEL['important']),
        atomQueryTags,
      ]),
    );
    set(atomSelectorTodoIdsCompleted, todoIdsCompleted);
  });

  useEffect(() => {
    prefetchQuery();
  }, [prefetchQuery]);

  return null;
};
