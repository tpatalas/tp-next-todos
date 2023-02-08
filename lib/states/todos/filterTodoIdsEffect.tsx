import { PATHNAME } from '@data/dataTypesObjects';
import { Labels } from '@lib/types';
import { atomLabelQuerySlug, atomQueryLabels } from '@states/labels';
import { atomHtmlTitleTag } from '@states/misc';
import { useNextQuerySlug } from '@states/utils/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { atomFilterTodoIds } from '.';

export const FilterTodoIdsEffect = () => {
  const labelId = useNextQuerySlug('/app/label');
  const { asPath } = useRouter();
  const labels = useRecoilCallback(({ snapshot }) => () => {
    return snapshot.getLoadable(atomQueryLabels).getValue();
  });
  const label_id = useRecoilValue(atomLabelQuerySlug);
  const label = labels().find((label) => label._id === label_id) || ({} as Labels);

  const filterTodoIds = useRecoilCallback(({ set }) => () => {
    if (asPath === PATHNAME['app']) {
      set(atomFilterTodoIds, 'focus');
      set(atomHtmlTitleTag, "Today's Focus");
      return;
    }
    if (asPath === PATHNAME['urgent']) {
      set(atomFilterTodoIds, 'urgent');
      set(atomHtmlTitleTag, 'Priority - Urgent');
      return;
    }
    if (asPath === PATHNAME['important']) {
      set(atomFilterTodoIds, 'important');
      set(atomHtmlTitleTag, 'Priority - Important');
      return;
    }
    if (asPath === PATHNAME['showAll']) {
      set(atomFilterTodoIds, 'showAll');
      set(atomHtmlTitleTag, 'All Todos');
      return;
    }
    if (asPath === PATHNAME['completed']) {
      set(atomFilterTodoIds, 'completed');
      set(atomHtmlTitleTag, 'Task Completed Todos');
      return;
    }
    if (asPath.match(new RegExp(PATHNAME['label']))) {
      set(atomFilterTodoIds, 'label');
      set(atomLabelQuerySlug, labelId);
      set(atomHtmlTitleTag, `Label - ${label.name}`);
      return;
    }
  });

  useEffect(() => {
    filterTodoIds();
  }, [filterTodoIds]);

  return null;
};
