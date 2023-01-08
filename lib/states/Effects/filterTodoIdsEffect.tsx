import { PATHNAME } from '@data/stateObjects';
import { atomFilterTodoIds } from '@states/todoStates';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';

export const FilterTodoIdsEffect = () => {
  const router = useRouter();
  const filterTodoIds = useRecoilCallback(({ set }) => () => {
    switch (router.asPath) {
      case PATHNAME['app']:
        set(atomFilterTodoIds, 'focus');
        break;
      case PATHNAME['urgent']:
        set(atomFilterTodoIds, 'urgent');
        break;
      case PATHNAME['important']:
        set(atomFilterTodoIds, 'important');
        break;
      case PATHNAME['showAll']:
        set(atomFilterTodoIds, 'showAll');
        break;
      case PATHNAME['completed']:
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
