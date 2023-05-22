import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { PATH_APP } from '@constAssertions/data';
import { BREAKPOINT } from '@constAssertions/ui';
import { STYLE_HOVER_ENABLED_SLATE_DARK } from '@data/stylePreset';
import { useNavigationOpen } from '@hooks/layouts';
import { useNextQuery } from '@hooks/misc';
import { SvgIcon } from '@icon/svgIcon';
import { TypesLabel } from '@label/label.types';
import { optionsButtonLabelRouteMatched, optionsButtonLabelRouteUnmatched } from '@options/button';
import { classNames, paths } from '@stateLogics/utils';
import { atomEffectMediaQuery } from '@states/atomEffects/misc';
import dynamic from 'next/dynamic';
import { Fragment, Fragment as LabelModalFragment, Suspense } from 'react';
import { useRecoilValue } from 'recoil';

const TodosCount = dynamic(() => import('@layouts/app/todosCount').then((mod) => mod.TodosCount));

const LabelItemDropdown = dynamic(() =>
  import('@dropdowns/v1/labelItemDropdown').then((mod) => mod.LabelItemDropdown),
);
const ItemLabelModal = dynamic(() =>
  import('@modals/labelModals/labelModal/itemLabelModal').then((mod) => mod.ItemLabelModal),
);
const DeleteLabelConfirmModal = dynamic(() =>
  import('@modals/confirmModal/deleteConfirmModal/deleteLabelConfirmModal').then(
    (mod) => mod.DeleteLabelConfirmModal,
  ),
);

export const LabelItem = ({ label }: Pick<TypesLabel, 'label'>) => {
  const slug = useNextQuery({ path: PATH_APP['label'] });
  const matchedSlug = slug === label._id;
  const isBreakpointMd = useRecoilValue(atomEffectMediaQuery(BREAKPOINT['md']));
  const setNavigationOpen = useNavigationOpen();

  return (
    <Fragment>
      <div
        className={classNames(
          'group relative flex w-full cursor-pointer flex-row items-center justify-between rounded-lg pr-[0.20rem]',
          matchedSlug
            ? 'bg-blue-100 font-semibold text-opacity-80'
            : 'hover:bg-slate-200 hover:bg-opacity-80 ',
        )}
      >
        <div className='mr-[0.5rem] inline-block w-full'>
          <PrefetchRouterButton
            options={{
              tooltip: label.name,
              path: paths(PATH_APP['label'] + '/', label._id),
              className: classNames('w-full focus:outline-none focus:ring-0 focus:ring-offset-0'),
            }}
            onClick={() => !isBreakpointMd && setNavigationOpen()}
          >
            <div className='flex w-full flex-row  px-2 py-2'>
              {matchedSlug ? (
                <SvgIcon options={optionsButtonLabelRouteMatched} />
              ) : (
                <SvgIcon options={optionsButtonLabelRouteUnmatched} />
              )}
              <div className='max-w-[10.7rem] truncate pl-2 text-gray-600 group-hover:text-gray-900'>
                {label.name}
              </div>
            </div>
          </PrefetchRouterButton>
        </div>
        <LabelItemDropdown
          label={label}
          options={{
            isInitiallyVisible: false,
            hoverBg: matchedSlug
              ? 'hover:bg-blue-900 hover:bg-opacity-[0.07]'
              : STYLE_HOVER_ENABLED_SLATE_DARK,
          }}
          menuContentOnClose={
            <span className='absolute right-[0.73rem] top-1/2 -translate-y-2/4 select-none text-xs tracking-tighter text-slate-400 group-hover:invisible'>
              <Suspense>
                <TodosCount label={label} />
              </Suspense>
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
