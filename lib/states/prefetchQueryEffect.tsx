import { useEffect } from 'react';
import { useRecoilCallback, waitForAll } from 'recoil';
import { atomQueryLabels, atomQueryTodoIds } from './atomQueries';

export const PrefetchQueryEffect = () => {
  const prefetchQury = useRecoilCallback(({ snapshot }) => async () => {
    await snapshot.getPromise(waitForAll([atomQueryTodoIds, atomQueryLabels]));
  });

  useEffect(() => {
    prefetchQury();
  }, [prefetchQury]);

  return null;
};
