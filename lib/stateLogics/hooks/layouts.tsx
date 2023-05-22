import { PATH_APP, PATH_HOME, PATH_IMAGE_APP } from '@constAssertions/data';
import { BREAKPOINT } from '@constAssertions/ui';
import { atomEffectMediaQuery } from '@states/atomEffects/misc';
import { atomLayoutType, atomNavigationOpen } from '@states/layouts';
import { atomFilterEffect, atomHtmlTitleTag, atomPathnameImage } from '@states/misc';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { RecoilValue, useRecoilCallback, useRecoilValue } from 'recoil';
import { useNextQuery } from './misc';
import { atomLabelQuerySlug, selectorSessionLabels } from '@label/label.states';
import { Labels } from '@label/label.types';
import { Types } from '@lib/types';

export const useNavigationOpen = () => {
  const layoutType = useRecoilValue(atomLayoutType);
  return useRecoilCallback(({ set }) => () => {
    set(atomNavigationOpen(layoutType), (event) => !event);
  });
};

export const useFilterPathHome = () => {
  const { asPath } = useRouter();
  const path = (key: keyof typeof PATH_HOME) => asPath === PATH_HOME[key];

  return useRecoilCallback(({ set }) => () => {
    const setState = (htmlTitle: string) => {
      set(atomHtmlTitleTag, htmlTitle);
    };

    if (path('home')) return setState('Todo list to automate your tasks');
    if (path('pricing')) return setState('Pricing');
    if (path('features')) return setState('Features');
    if (path('implementations')) return setState('Implementations');
    if (path('contact')) return setState('Contact');
  });
};

export const useFilterPathApp = () => {
  const { asPath } = useRouter();
  const appLabel = useNextQuery({ path: PATH_APP['label'] });
  const path = (key: keyof typeof PATH_APP) => asPath === PATH_APP[key];

  return useRecoilCallback(({ snapshot, set }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).valueMaybe();

    const labels = get(selectorSessionLabels) ?? [];
    const label_id = get(atomLabelQuerySlug);
    const label = labels.find((label) => label._id === label_id) || ({} as Labels);

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
};

export const useInitialNavigation = ({ layoutType }: Pick<Types, 'layoutType'>) => {
  const breakPointMd = useRecoilValue(atomEffectMediaQuery(BREAKPOINT['md']));
  const breakPointMl = useRecoilValue(atomEffectMediaQuery(BREAKPOINT['ml']));
  return useRecoilCallback(({ set }) => () => {
    const breakpointMd = layoutType === 'app' ? breakPointMd : breakPointMl;

    if (breakpointMd) {
      set(atomNavigationOpen('app'), true);
      set(atomNavigationOpen('home'), false);
      return;
    }
    set(atomNavigationOpen('app'), false);
    set(atomNavigationOpen('home'), false);
  });
};

export const useLayoutType = ({ layoutType }: Pick<Types, 'layoutType'>) => {
  return useRecoilCallback(({ set }) => () => {
    set(atomLayoutType, layoutType);
  });
};

export const useLayoutBodyTagClass = ({ layoutType }: Pick<Types, 'layoutType'>) => {
  const layoutBodyHandler = useCallback(() => {
    if (layoutType === 'app') return document.body.classList.add('overflow-hidden');
    return document.body.classList.remove('overflow-hidden');
  }, [layoutType]);

  return layoutBodyHandler;
};
