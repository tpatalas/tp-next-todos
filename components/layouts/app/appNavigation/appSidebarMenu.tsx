import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { SvgIcon } from '@components/icons/svgIcon';
import { STYLE_HOVER_SLATE_LIGHT } from '@data/stylePreset';
import { useRouter } from 'next/router';
import {
  Fragment as FooterSidebarMenuFragment,
  Suspense,
  Fragment as TotalNumberTodos,
} from 'react';
import { useRecoilValue } from 'recoil';
import { DATA_SIDEBAR_MENU } from '@collections/sidebarMenu';
import { BREAKPOINT } from '@constAssertions/ui';
import { useNavigationOpen } from '@hooks/layouts';
import { atomMediaQuery } from '@states/misc';
import { classNames } from '@stateLogics/utils';
import dynamic from 'next/dynamic';

const TodosCount = dynamic(() => import('@layouts/app/todosCount').then((mod) => mod.TodosCount));

export const AppSidebarMenu = () => {
  const router = useRouter();
  const setSidebarOpen = useNavigationOpen();
  const isBreakpointMd = useRecoilValue(atomMediaQuery(BREAKPOINT['md']));

  return (
    <FooterSidebarMenuFragment>
      <nav className='pb-4'>
        {DATA_SIDEBAR_MENU.map((item) => (
          <ul
            key={item.name}
            className='relative'>
            <PrefetchRouterButton
              options={{
                tooltip: item.tooltip,
                path: item.path,
                className: classNames(
                  router.asPath === item.path
                    ? 'cursor-default bg-blue-100 font-semibold text-gray-900 text-opacity-80'
                    : `font-medium text-gray-600 hover:text-gray-900 ${STYLE_HOVER_SLATE_LIGHT}`,
                  'group flex w-full items-center rounded-lg px-2 py-2 tracking-wide text-sm focus:outline-none focus:ring-0 focus:ring-offset-0',
                ),
              }}
              onClick={() => !isBreakpointMd && setSidebarOpen()}>
              <span className='pr-3'>
                <SvgIcon
                  options={{
                    path: router.asPath === item.path ? item.iconActive : item.icon,
                    className: classNames(item.iconColor, 'h-6 w-6 flex-shrink-0'),
                  }}
                />
              </span>
              {item.name}
              <TotalNumberTodos>
                <span className='absolute right-[0.87rem] top-1/2 -translate-y-2/4 select-none text-xs tracking-tighter text-slate-400'>
                  <Suspense>
                    <TodosCount pathname={item.path} />
                  </Suspense>
                </span>
              </TotalNumberTodos>
            </PrefetchRouterButton>
          </ul>
        ))}
      </nav>
    </FooterSidebarMenuFragment>
  );
};
