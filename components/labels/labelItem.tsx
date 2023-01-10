import { SvgIcon } from '@components/icons/svgIcon';
import { ICON_LABEL } from '@data/materialSymbols';
import { Types } from '@lib/types';
import dynamic from 'next/dynamic';
import { Fragment, Fragment as LabelModalFragment } from 'react';

const LabelItemDropdown = dynamic(() =>
  import('@dropdowns/labelItemDropdown').then((mod) => mod.LabelItemDropdown),
);
const ItemLabelModal = dynamic(() =>
  import('@modals/labelModals/labelModal/itemLabelModal').then((mod) => mod.ItemLabelModal),
);

export const LabelItem = ({ label }: Pick<Types, 'label'>) => {
  return (
    <Fragment>
      <div className='item-center group relative -mb-1 flex cursor-pointer flex-row justify-between'>
        <div className='flex w-full flex-row rounded-lg py-2 px-2 hover:bg-gray-200 hover:bg-opacity-80'>
          <SvgIcon
            data={{
              path: ICON_LABEL,
              className: 'h-5 w-5 fill-gray-500 group-hover:fill-gray-700',
            }}
          />
          <div className='pl-2 text-gray-600 group-hover:text-gray-900'>{label.name}</div>
        </div>
        <LabelItemDropdown
          label={label}
          data={{ initialVisible: false }}
        />
      </div>
      <LabelModalFragment>
        <ItemLabelModal label={label} />
      </LabelModalFragment>
    </Fragment>
  );
};
