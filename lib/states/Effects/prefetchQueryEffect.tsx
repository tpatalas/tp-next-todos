import { atomQueryTodoIdsCompleted, atomQueryTodoIds, atomQueryTags } from '@atomQueries/index';
import { atomSelectorTodoIdsCompleted } from '@states/todoStates';
import { useEffect } from 'react';
import { useRecoilCallback, waitForAll } from 'recoil';

export const PrefetchQueryEffect = () => {
  const prefetchQuery = useRecoilCallback(({ snapshot, set }) => async () => {
    const [todoIdsCompleted] = await snapshot.getPromise(
      waitForAll([atomQueryTodoIdsCompleted, atomQueryTodoIds, atomQueryTags]),
    );
    set(atomSelectorTodoIdsCompleted, todoIdsCompleted);
  });

  useEffect(() => {
    prefetchQuery();
  }, [prefetchQuery]);

  return null;
};
