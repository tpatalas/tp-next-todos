import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { SvgIcon } from '@components/icons/svgIcon';
import { ICON_LABEL, ICON_LABEL_FILL } from '@data/materialSymbols';
import { TodosCount } from '@layouts/layoutApp/layout/layoutFooter/footerSidebar/todosCount';
import { Types } from '@lib/types';
import { classNames, paths } from '@states/utils';
import { useNextQuerySlug } from '@states/utils/hooks';
import dynamic from 'next/dynamic';
import { Fragment, Fragment as LabelModalFragment } from 'react';

const LabelItemDropdown = dynamic(() =>
  import('@dropdowns/labelItemDropdown').then((mod) => mod.LabelItemDropdown),
);
const ItemLabelModal = dynamic(() =>
  import('@modals/labelModals/labelModal/itemLabelModal').then((mod) => mod.ItemLabelModal),
);
const DeleteLabelConfirmModal = dynamic(() =>
  import('@modals/confirmModal/deleteConfirmModal/deleteLabelConfirmModal').then(
    (mod) => mod.DeleteLabelConfirmModal,
  ),
);

export const LabelItem = ({ label }: Pick<Types, 'label'>) => {
  const slug = useNextQuerySlug('/app/label');
  const matchedSlug = slug === label._id;

  return (
    <Fragment>
      <div className='group relative -mb-0 flex w-full cursor-pointer flex-row items-center justify-between'>
        <div className='mr-[0.5rem] inline-block w-full'>
          <PrefetchRouterButton
            tooltip={label.name}
            offset={[0, 10]}
            path={paths('/app/label/', label._id)}
            className={classNames(
              'w-full rounded-lg hover:bg-gray-200 hover:bg-opacity-80 focus:outline-none focus:ring-0 focus:ring-offset-0',
              matchedSlug && 'bg-blue-100 font-semibold',
            )}>
            <div className='flex w-full flex-row py-2 px-2'>
              {matchedSlug ? (
                <SvgIcon
                  data={{
                    path: ICON_LABEL_FILL,
                    className: 'h-5 w-5 fill-yellow-500',
                  }}
                />
              ) : (
                <SvgIcon
                  data={{
                    path: ICON_LABEL,
                    className: 'h-5 w-5 fill-gray-500 group-hover:fill-yellow-500 ',
                  }}
                />
              )}
              <div className='pl-2 text-gray-600 group-hover:text-gray-900'>{label.name}</div>
            </div>
          </PrefetchRouterButton>
        </div>
        <LabelItemDropdown
          label={label}
          data={{ isInitiallyVisible: false }}
        />
        <span className='absolute right-3 top-1/2 -translate-y-2/4 select-none text-xs tracking-tighter text-slate-400'>
          <TodosCount label={label} />
        </span>
      </div>
      <LabelModalFragment>
        <ItemLabelModal label={label} />
        <DeleteLabelConfirmModal label={label} />
      </LabelModalFragment>
    </Fragment>
  );
};
