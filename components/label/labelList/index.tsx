import { IconButton } from '@buttons/iconButton';
import { useLabelModalStateOpen } from '@hooks/modals';
import { optionsLabelButtonAddMore } from '@label/label.const';
import { selectorSessionLabels } from '@label/label.states';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';
import { LabelItem } from './labelItem';

export const LabelList = () => {
  const labelList = useRecoilValue(selectorSessionLabels);
  const labelModalOpen = useLabelModalStateOpen(undefined);

  return (
    <Fragment>
      <div className='text-sm text-gray-900'>
        <div className='item-center flex flex-row justify-between fill-gray-500 pb-1 text-base opacity-90'>
          <div className='py-2 pl-2'>Labels</div>
          <IconButton
            options={optionsLabelButtonAddMore}
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
