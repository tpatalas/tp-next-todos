import { PATHNAME } from '@data/dataTypesObjects';
import { atomLabelQuerySlug } from '@states/labels';
import { useNextQuerySlug } from '@states/utils/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilCallback } from 'recoil';
import { atomFilterTodoIds } from '.';

export const FilterTodoIdsEffect = () => {
  const labelId = useNextQuerySlug('/app/label');
  const { asPath } = useRouter();

  const filterTodoIds = useRecoilCallback(({ set }) => () => {
    if (asPath === PATHNAME['app']) return set(atomFilterTodoIds, 'focus');
    if (asPath === PATHNAME['urgent']) return set(atomFilterTodoIds, 'urgent');
    if (asPath === PATHNAME['important']) return set(atomFilterTodoIds, 'important');
    if (asPath === PATHNAME['showAll']) return set(atomFilterTodoIds, 'showAll');
    if (asPath === PATHNAME['completed']) return set(atomFilterTodoIds, 'completed');
    if (asPath.match(new RegExp(PATHNAME['label']))) {
      set(atomFilterTodoIds, 'label');
      set(atomLabelQuerySlug, labelId);
      return;
    }
  });

  useEffect(() => {
    filterTodoIds();
  }, [filterTodoIds]);

  return null;
};
