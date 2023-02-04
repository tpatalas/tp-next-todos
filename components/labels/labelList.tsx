import { IconButton } from '@buttons/iconButton';
import { optionsButtonLabelAddMore } from '@data/dataOptions';
import { atomQueryLabels } from '@states/labels';
import { useLabelModalStateOpen } from '@states/modals/hooks';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { LabelItem } from './labelItem';

export const LabelList = () => {
  const labelList = useRecoilValue(atomQueryLabels);
  const labelModalOpen = useLabelModalStateOpen(undefined);

  return (
    <Fragment>
      <div className='text-sm text-gray-900'>
        <div className='item-center flex flex-row justify-between fill-gray-500 pb-1 text-base opacity-90'>
          <div className='py-2 pl-2'>Labels</div>
          <IconButton
            options={optionsButtonLabelAddMore}
            onClick={() => labelModalOpen()}
          />
        </div>
        <ul>
          {labelList.map((label) => (
            <li key={label._id?.toString()}>
              <LabelItem label={label} />
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};
