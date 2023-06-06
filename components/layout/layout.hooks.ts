import { PATH_APP, PATH_HOME, PATH_IMAGE_APP } from '@constAssertions/data';
import { BREAKPOINT } from '@constAssertions/ui';
import { atomEffectMediaQuery } from '@states/atomEffects/misc';
import { atomLayoutType, atomNavigationOpen } from '@states/layouts';
import { atomFilterEffect, atomHtmlTitleTag, atomPathnameImage } from '@states/misc';
import { useRouter } from 'next-router-mock';
import { RecoilValue, useRecoilCallback, useRecoilValue } from 'recoil';
import { TypesLayout } from './layout.types';
import { useCallback } from 'react';
import { useNextQuery } from '@hooks/misc';
import { selectorSessionLabels, atomLabelQuerySlug } from '@label/label.states';
import { Labels } from '@label/label.types';

export const useFilterPathHome = () => {
  const { asPath } = useRouter();

  return useRecoilCallback(
    ({ set }) =>
      () => {
        const path = (key: keyof typeof PATH_HOME) => asPath === PATH_HOME[key];
        const setState = (htmlTitle: string) => {
          set(atomHtmlTitleTag, htmlTitle);
        };

        if (path('home')) return setState('Todo list to automate your tasks');
        if (path('pricing')) return setState('Pricing');
        if (path('features')) return setState('Features');
        if (path('implementations')) return setState('Implementations');
        if (path('contact')) return setState('Contact');
      },
    [asPath],
  );
};

export const useInitialNavigation = ({ path }: Pick<TypesLayout, 'path'>) => {
  const breakPointMd = useRecoilValue(atomEffectMediaQuery(BREAKPOINT['md']));
  const breakPointMl = useRecoilValue(atomEffectMediaQuery(BREAKPOINT['ml']));

  return useRecoilCallback(
    ({ set }) =>
      () => {
        const breakpointMd = path === 'app' ? breakPointMd : breakPointMl;

        if (breakpointMd) {
          set(atomNavigationOpen('app'), true);
          set(atomNavigationOpen('home'), false);
          return;
        }
        set(atomNavigationOpen('app'), false);
        set(atomNavigationOpen('home'), false);
      },
    [breakPointMd, breakPointMl, path],
  );
};

export const useLayoutType = ({ path }: Pick<TypesLayout, 'path'>) => {
  return useRecoilCallback(
    ({ set }) =>
      () => {
        set(atomLayoutType, path);
      },
    [path],
  );
};

export const useLayoutBodyTagClass = ({ path }: Pick<TypesLayout, 'path'>) => {
  return useCallback(() => {
    if (path === 'app') return document.body.classList.add('overflow-hidden');
    return document.body.classList.remove('overflow-hidden');
  }, [path]);
};

export const useNavigationOpen = () => {
  const layoutType = useRecoilValue(atomLayoutType);
  return useRecoilCallback(
    ({ set }) =>
      () => {
        set(atomNavigationOpen(layoutType), (event) => !event);
      },
    [layoutType],
  );
};

export const useFilterPathApp = () => {
  const { asPath } = useRouter();
  const appLabel = useNextQuery({ path: PATH_APP['label'] });

  return useRecoilCallback(
    ({ snapshot, set }) =>
      () => {
        const path = (key: keyof typeof PATH_APP) => asPath === PATH_APP[key];
        const get = <T>(p: RecoilValue<T>) => snapshot.getLoadable(p).valueMaybe();

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
      },
    [appLabel, asPath],
  );
};
