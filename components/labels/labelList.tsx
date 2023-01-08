import { atomQueryLabels } from '@atomQueries/index';
import { IconButton } from '@buttons/iconButton';
import { ICON_ADD } from '@data/materialSymbols';
import { useLabelModalStateOpen } from '@states/modalStates';
import { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

export const LabelList = () => {
  const labelList = useRecoilValue(atomQueryLabels);
  const labelModalOpen = useLabelModalStateOpen(undefined);

  return (
    <Fragment>
      <div className='pl-2 text-sm text-gray-900'>
        <div className='item-center flex flex-row justify-between pb-2 text-base text-gray-900 opacity-80'>
          <div className='py-2'>Labels</div>
          <IconButton
            data={{ path: ICON_ADD, hoverBg: 'hover:enabled:bg-gray-200' }}
            onClick={() => labelModalOpen()}
          />
        </div>
        <ul>
          {labelList.map((label) => (
            <li key={label._id}>{label.name}</li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};
