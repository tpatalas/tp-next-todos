import { atomQueryTodoIds, atomQueryTodoIdsCompleted } from '@states/atoms/atomQuery';
import { atomSelectorTodoIdsCompleted } from '@states/atoms/atomTodos';
import { useEffect } from 'react';
import { useRecoilCallback, waitForAll } from 'recoil';

export const PrefetchQueryEffect = () => {
  const prefetchQuery = useRecoilCallback(({ snapshot, set }) => async () => {
    const [todoIdsCompleted] = await snapshot.getPromise(
      waitForAll([atomQueryTodoIdsCompleted, atomQueryTodoIds]),
    );
    set(atomSelectorTodoIdsCompleted, todoIdsCompleted);
  });

  useEffect(() => {
    prefetchQuery();
  });

  return null;
};
