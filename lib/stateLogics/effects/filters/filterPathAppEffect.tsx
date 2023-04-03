/* eslint-disable react-hooks/exhaustive-deps */
import { PATH_IMAGE_APP, PATH_APP } from '@constAssertions/data';
import { useNextQuery } from '@hooks/misc';
import { Labels } from '@lib/types';
import { selectorSessionLabels } from '@states/atomEffects/labels';
import { atomLabelQuerySlug } from '@states/labels';
import { atomFilterEffect, atomHtmlTitleTag, atomPathnameImage } from '@states/misc';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';

export const FilterPathAppEffect = () => {
  const { asPath } = useRouter();
  const labels = useRecoilValue(selectorSessionLabels);
  const label_id = useRecoilValue(atomLabelQuerySlug);
  const label = labels.find((label) => label._id === label_id) || ({} as Labels);
  const appLabel = useNextQuery({ path: PATH_APP['label'] });
  const path = (key: keyof typeof PATH_APP) => asPath === PATH_APP[key];

  const filterPathAppHandler = useRecoilCallback(({ set }) => () => {
    const setState = (key: keyof typeof PATH_IMAGE_APP, htmlTitle: string) => {
      set(atomFilterEffect, key);
      set(atomHtmlTitleTag, htmlTitle);
      set(atomPathnameImage, PATH_IMAGE_APP[key]);
    };

    if (path('app')) return setState('focus', "Today's Focus");
    if (path('urgent')) return setState('urgent', 'Priority | Urgent');
    if (path('important')) return setState('important', 'Priority | Important');
    if (path('showAll')) return setState('showAll', 'All Todos');
    if (path('completed')) return setState('completed', 'Completed Todos');
    if (appLabel) {
      set(atomFilterEffect, 'label');
      set(atomLabelQuerySlug, appLabel);
      set(atomHtmlTitleTag, `Label | ${label.name}`);
      set(atomPathnameImage, PATH_IMAGE_APP['label']);
      return;
    }
  });

  useEffect(() => {
    filterPathAppHandler();
  }, [filterPathAppHandler]);

  return null;
};
