import { Labels } from '@lib/types';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { PATH_APP, PATHNAME_IMAGE } from '@constAssertions/data';
import { useNextQuery } from '@hooks/misc';
import { selectorSessionLabels } from '@states/atomEffects/labels';
import { atomLabelQuerySlug } from '@states/labels';
import { atomHtmlTitleTag, atomPathnameImage } from '@states/misc';
import { atomFilterTodoIds } from '@states/todos';

export const FilterTodoIdsEffect = () => {
  const labelId = useNextQuery({ path: PATH_APP['label'] });
  const { asPath } = useRouter();
  const labels = useRecoilValue(selectorSessionLabels);
  const label_id = useRecoilValue(atomLabelQuerySlug);
  const label = labels.find((label) => label._id === label_id) || ({} as Labels);

  const filterTodoIds = useRecoilCallback(({ set }) => () => {
    if (asPath === PATH_APP['app']) {
      set(atomFilterTodoIds, 'focus');
      set(atomHtmlTitleTag, "Today's Focus");
      set(atomPathnameImage, PATHNAME_IMAGE['app']);
      return;
    }
    if (asPath === PATH_APP['urgent']) {
      set(atomFilterTodoIds, 'urgent');
      set(atomHtmlTitleTag, 'Priority - Urgent');
      set(atomPathnameImage, PATHNAME_IMAGE['urgent']);
      return;
    }
    if (asPath === PATH_APP['important']) {
      set(atomFilterTodoIds, 'important');
      set(atomHtmlTitleTag, 'Priority - Important');
      set(atomPathnameImage, PATHNAME_IMAGE['important']);
      return;
    }
    if (asPath === PATH_APP['showAll']) {
      set(atomFilterTodoIds, 'showAll');
      set(atomHtmlTitleTag, 'All Todos');
      set(atomPathnameImage, PATHNAME_IMAGE['showAll']);
      return;
    }
    if (asPath === PATH_APP['completed']) {
      set(atomFilterTodoIds, 'completed');
      set(atomHtmlTitleTag, 'Task Completed Todos');
      set(atomPathnameImage, PATHNAME_IMAGE['completed']);
      return;
    }
    // catch any string after /label/
    if (asPath.match(`^${PATH_APP['label']}\/.*$`)) {
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
