import { PATHNAME_IMAGE, PATH_APP, PATH_HOME } from '@constAssertions/data';
import { BREAKPOINT } from '@constAssertions/ui';
import { Labels, Types } from '@lib/types';
import { selectorSessionLabels } from '@states/atomEffects/labels';
import { atomLabelQuerySlug } from '@states/labels';
import {
  atomLayoutType,
  atomNavigationInitialOpen,
  atomNavigationOpenMobile,
  atomNavigationOpenSetting,
} from '@states/layouts';
import {
  atomFilterEffect,
  atomHtmlTitleTag,
  atomMediaQuery,
  atomPathnameImage,
} from '@states/misc';
import { useRouter } from 'next/router';
import { RecoilValue, useRecoilCallback } from 'recoil';
import { useNextQuery } from './misc';

/**
 * Hooks
 **/

export const useNavigationOpen = () => {
  return useRecoilCallback(({ snapshot, set }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    const layoutType = get(atomLayoutType);
    const breakpoint =
      layoutType === 'app'
        ? get(atomMediaQuery(BREAKPOINT['md']))
        : get(atomMediaQuery(BREAKPOINT['ml']));

    // Under the mediaQuery medium ('md') will return false and will return true over mediaQuery
    if (!breakpoint) return set(atomNavigationOpenMobile(layoutType), (event) => !event);
    set(atomNavigationOpenSetting(layoutType), (event) => !event);
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

    const setState = (key: keyof typeof PATHNAME_IMAGE, htmlTitle: string) => {
      set(atomFilterEffect, key);
      set(atomHtmlTitleTag, htmlTitle);
      set(atomPathnameImage, PATHNAME_IMAGE[key]);
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
      set(atomPathnameImage, PATHNAME_IMAGE['label']);
      return;
    }
  });
};

export const useInitialNavigation = ({ layoutType }: Pick<Types, 'layoutType'>) => {
  return useRecoilCallback(({ snapshot, set, reset }) => () => {
    const get = <T,>(p: RecoilValue<T>) => snapshot.getLoadable(p).getValue();
    if (layoutType === 'app') return set(atomNavigationInitialOpen(layoutType), true);
    !!get(atomNavigationInitialOpen(layoutType)) && reset(atomNavigationInitialOpen(layoutType));
    return;
  });
};

export const useLayoutType = ({ layoutType }: Pick<Types, 'layoutType'>) => {
  return useRecoilCallback(({ set }) => () => {
    set(atomLayoutType, layoutType);
  });
};
