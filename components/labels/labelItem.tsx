import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { SvgIcon } from '@components/icons/svgIcon';
import { optionsButtonLabelRouteMatched, optionsButtonLabelRouteUnmatched } from '@data/dataOptions';
import { BREAKPOINT } from '@data/dataTypesObjects';
import { STYLE_HOVER_ENABLED_SLATE_DARK } from '@data/stylePreset';
import { TodosCount } from '@layouts/layoutApp/layout/layoutFooter/footerSidebar/todosCount';
import { Types } from '@lib/types';
import { useSidebarOpen } from '@states/layouts/hooks';
import { atomMediaQuery } from '@states/misc';
import { classNames, paths } from '@states/utils';
import { useNextQuerySlug } from '@states/utils/hooks';
import dynamic from 'next/dynamic';
import { Fragment, Fragment as LabelModalFragment } from 'react';
import { useRecoilValue } from 'recoil';

const LabelItemDropdown = dynamic(() => import('@dropdowns/labelItemDropdown').then((mod) => mod.LabelItemDropdown), {
  ssr: false,
});
const ItemLabelModal = dynamic(
  () => import('@modals/labelModals/labelModal/itemLabelModal').then((mod) => mod.ItemLabelModal),
  { ssr: false },
);
const DeleteLabelConfirmModal = dynamic(
  () =>
    import('@modals/confirmModal/deleteConfirmModal/deleteLabelConfirmModal').then(
      (mod) => mod.DeleteLabelConfirmModal,
    ),
  { ssr: false },
);

export const LabelItem = ({ label }: Pick<Types, 'label'>) => {
  const slug = useNextQuerySlug('/app/label');
  const matchedSlug = slug === label._id;
  const isBreakpointMd = useRecoilValue(atomMediaQuery(BREAKPOINT['md']));
  const setSideBarOpen = useSidebarOpen();

  return (
    <Fragment>
      <div
        className={classNames(
          'group relative flex w-full cursor-pointer flex-row items-center justify-between rounded-md pr-[0.20rem]',
          matchedSlug ? 'bg-blue-100 font-semibold text-opacity-80' : 'hover:bg-slate-200 hover:bg-opacity-80 ',
        )}>
        <div className='mr-[0.5rem] inline-block w-full'>
          <PrefetchRouterButton
            tooltip={label.name}
            path={paths('/app/label/', label._id)}
            className={classNames('w-full focus:outline-none focus:ring-0 focus:ring-offset-0')}
            onClick={() => !isBreakpointMd && setSideBarOpen()}>
            <div className='flex w-full flex-row  py-2 px-2'>
              {matchedSlug ? (
                <SvgIcon options={optionsButtonLabelRouteMatched} />
              ) : (
                <SvgIcon options={optionsButtonLabelRouteUnmatched} />
              )}
              <div className='max-w-[10.7rem] truncate pl-2 text-gray-600 group-hover:text-gray-900'>{label.name}</div>
            </div>
          </PrefetchRouterButton>
        </div>
        <LabelItemDropdown
          label={label}
          options={{
            isInitiallyVisible: false,
            hoverBg: matchedSlug ? 'hover:bg-blue-900 hover:bg-opacity-[0.07]' : STYLE_HOVER_ENABLED_SLATE_DARK,
          }}
          headerContentsOnClose={
            <span className='absolute right-[0.73rem] top-1/2 -translate-y-2/4 select-none text-xs tracking-tighter text-slate-400 group-hover:invisible'>
              <TodosCount label={label} />
            </span>
          }
        />
      </div>
      <LabelModalFragment>
        <ItemLabelModal label={label} />
        <DeleteLabelConfirmModal label={label} />
      </LabelModalFragment>
    </Fragment>
  );
};
