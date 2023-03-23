import { Labels } from '@lib/types';
import { atomLabelQuerySlug } from '@states/labels';
import { selectorSessionLabels } from '@states/labels/atomQueries';
import { atomHtmlTitleTag, atomPathnameImage } from '@states/misc';
import { useNextQuery } from '@states/utils/hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { atomFilterTodoIds } from '@states/todos';
import { PATHNAME, PATHNAME_IMAGE } from '@constAssertions/data';

export const FilterTodoIdsEffect = () => {
  const labelId = useNextQuery({ path: PATHNAME['label'] });
  const { asPath } = useRouter();
  const labels = useRecoilValue(selectorSessionLabels);
  const label_id = useRecoilValue(atomLabelQuerySlug);
  const label = labels.find((label) => label._id === label_id) || ({} as Labels);

  const filterTodoIds = useRecoilCallback(({ set }) => () => {
    if (asPath === PATHNAME['app']) {
      set(atomFilterTodoIds, 'focus');
      set(atomHtmlTitleTag, "Today's Focus");
      set(atomPathnameImage, PATHNAME_IMAGE['app']);
      return;
    }
    if (asPath === PATHNAME['urgent']) {
      set(atomFilterTodoIds, 'urgent');
      set(atomHtmlTitleTag, 'Priority - Urgent');
      set(atomPathnameImage, PATHNAME_IMAGE['urgent']);
      return;
    }
    if (asPath === PATHNAME['important']) {
      set(atomFilterTodoIds, 'important');
      set(atomHtmlTitleTag, 'Priority - Important');
      set(atomPathnameImage, PATHNAME_IMAGE['important']);
      return;
    }
    if (asPath === PATHNAME['showAll']) {
      set(atomFilterTodoIds, 'showAll');
      set(atomHtmlTitleTag, 'All Todos');
      set(atomPathnameImage, PATHNAME_IMAGE['showAll']);
      return;
    }
    if (asPath === PATHNAME['completed']) {
      set(atomFilterTodoIds, 'completed');
      set(atomHtmlTitleTag, 'Task Completed Todos');
      set(atomPathnameImage, PATHNAME_IMAGE['completed']);
      return;
    }
    // catch any string after /label/
    if (asPath.match(`^${PATHNAME['label']}\/.*$`)) {
      set(atomFilterTodoIds, 'label');
      set(atomLabelQuerySlug, labelId);
      set(atomHtmlTitleTag, `Label - ${label.name}`);
      set(atomPathnameImage, PATHNAME_IMAGE['label']);
      return;
    }
  });

  useEffect(() => {
    filterTodoIds();
  }, [filterTodoIds]);

  return null;
};
