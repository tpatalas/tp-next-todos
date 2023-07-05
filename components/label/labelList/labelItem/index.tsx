import { PrefetchRouterButton } from '@buttons/button/prefetchRouterButton';
import { PATH_APP } from '@constAssertions/data';
import { BREAKPOINT } from '@constAssertions/ui';
import { useNextQuery } from '@hooks/misc';
import { TypesLabel } from '@label/label.types';
import { classNames } from '@stateLogics/utils';
import { atomEffectMediaQuery } from '@states/atomEffects/misc';
import dynamic from 'next/dynamic';
import { Fragment, Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { LabelItemButtonContent } from './labelItemButtonContent';
import { DropdownContentOnClose } from './labelItemDropdown/dropdownContentOnClose';
import { useNavigationOpen } from '@layout/layout.hooks';
import { optionsLabelItemPrefetchButton, optionsLabelItemDropdown } from '@label/label.consts';

const LabelItemDropdown = dynamic(() => import('./labelItemDropdown').then((mod) => mod.LabelItemDropdown));
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
  const labelItemClassName = classNames(
    'group relative flex w-full cursor-pointer flex-row items-center justify-between rounded-lg pr-[0.20rem]',
    matchedSlug ? 'bg-blue-100 font-semibold text-opacity-80' : 'hover:bg-slate-200 hover:bg-opacity-80 ',
  );

  return (
    <Fragment>
      <div
        className={labelItemClassName}
        data-testid='labelItem-testid'
      >
        <div className='mr-[0.5rem] inline-block w-full'>
          <PrefetchRouterButton
            options={optionsLabelItemPrefetchButton(label)}
            onClick={() => !isBreakpointMd && setNavigationOpen()}
          >
            <LabelItemButtonContent
              label={label}
              matchedSlug={matchedSlug}
            />
          </PrefetchRouterButton>
        </div>
        <LabelItemDropdown
          label={label}
          options={optionsLabelItemDropdown(matchedSlug)}
          menuContentOnClose={<DropdownContentOnClose label={label} />}
        />
      </div>
      <Suspense fallback={null}>
        <ItemLabelModal label={label} />
        <DeleteLabelConfirmModal label={label} />
      </Suspense>
    </Fragment>
  );
};
