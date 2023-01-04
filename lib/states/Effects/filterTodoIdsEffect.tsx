import { atomFilterTodoIds } from '@states/todoStates';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

export const FilterTodoIdsEffect = () => {
  const router = useRouter();
  const filterTodoIds = useRecoilCallback(({ set }) => () => {
    switch (router.asPath) {
      case '/app':
        set(atomFilterTodoIds, 'showAll');
        break;
      case '/app/urgent':
        set(atomFilterTodoIds, 'urgent');
        break;
      case '/app/important':
        set(atomFilterTodoIds, 'important');
        break;
      case '/app/completed':
        set(atomFilterTodoIds, 'completed');
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    filterTodoIds();
  }, [filterTodoIds]);

  return null;
};
