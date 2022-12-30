import { atomQueryTags, atomQueryTodoIds, atomQueryTodoIdsCompleted } from '@states/atomQuries';
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
