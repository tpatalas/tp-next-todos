import { atomQueryLabels } from '@atomQueries/index';
import { IconButton } from '@buttons/iconButton';
import { ICON_NEW_LABEL } from '@data/materialSymbols';
import { useLabelModalStateOpen } from '@states/modalStates';
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
          <div className='py-2 pl-1'>Labels</div>
          <IconButton
            data={{
              path: ICON_NEW_LABEL,
              tooltip: 'Add new label',
              hoverBg: 'hover:enabled:bg-gray-200',
              padding: 'p-2',
              color: 'hover:enabled:bg-fill-700',
            }}
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
