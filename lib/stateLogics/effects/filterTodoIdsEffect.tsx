import { PATHNAME_IMAGE, PATH_APP, PATH_DEMO } from '@constAssertions/data';
import { useNextQuery } from '@hooks/misc';
import { Labels } from '@lib/types';
import { selectorSessionLabels } from '@states/atomEffects/labels';
import { atomLabelQuerySlug } from '@states/labels';
import { atomHtmlTitleTag, atomPathnameImage } from '@states/misc';
import { atomFilterTodoIds } from '@states/todos';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

export const FilterTodoIdsEffect = () => {
  const { asPath } = useRouter();
  const labels = useRecoilValue(selectorSessionLabels);
  const label_id = useRecoilValue(atomLabelQuerySlug);
  const label = labels.find((label) => label._id === label_id) || ({} as Labels);
  const demoLabel = useNextQuery({ path: PATH_APP['label'] });
  const appLabel = useNextQuery({ path: PATH_APP['label'] });

  const filterTodoIds = useRecoilCallback(({ set }) => () => {
    if (asPath === PATH_APP['app'] || asPath === PATH_DEMO['app']) {
      set(atomFilterTodoIds, 'focus');
      set(atomHtmlTitleTag, "Today's Focus");
      set(atomPathnameImage, PATHNAME_IMAGE['focus']);
      return;
    }
    if (asPath === PATH_APP['urgent'] || asPath === PATH_DEMO['urgent']) {
      set(atomFilterTodoIds, 'urgent');
      set(atomHtmlTitleTag, 'Priority | Urgent');
      set(atomPathnameImage, PATHNAME_IMAGE['urgent']);
      return;
    }
    if (asPath === PATH_APP['important'] || asPath === PATH_DEMO['important']) {
      set(atomFilterTodoIds, 'important');
      set(atomHtmlTitleTag, 'Priority | Important');
      set(atomPathnameImage, PATHNAME_IMAGE['important']);
      return;
    }
    if (asPath === PATH_APP['showAll'] || asPath === PATH_DEMO['showAll']) {
      set(atomFilterTodoIds, 'showAll');
      set(atomHtmlTitleTag, 'All Todos');
      set(atomPathnameImage, PATHNAME_IMAGE['showAll']);
      return;
    }
    if (asPath === PATH_APP['completed'] || asPath === PATH_DEMO['completed']) {
      set(atomFilterTodoIds, 'completed');
      set(atomHtmlTitleTag, 'Task Completed Todos');
      set(atomPathnameImage, PATHNAME_IMAGE['completed']);
      return;
    }
    if (appLabel || demoLabel) {
      set(atomFilterTodoIds, 'label');
      set(atomLabelQuerySlug, appLabel);
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
