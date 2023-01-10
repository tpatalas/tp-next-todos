import { IconButton } from '@buttons/iconButton';
import { ICON_MORE_VERT } from '@data/materialSymbols';
import { Types } from '@lib/types';
import { ItemLabelModal } from '@modals/labelModals/labelModal/itemLabelModal';
import { atomLabelModalOpen } from '@states/modalStates';
import { Fragment, Fragment as LabelModalFragment } from 'react';
import { useSetRecoilState } from 'recoil';

export const LabelItem = ({ label }: Pick<Types, 'label'>) => {
  const setLabelModal = useSetRecoilState(atomLabelModalOpen(label._id));

  return (
    <Fragment>
      <div className='item-center flex flex-row justify-between'>
        <div className='py-2'>{label.name}</div>
        <IconButton
          data={{ path: ICON_MORE_VERT }}
          onClick={() => setLabelModal(true)}
        />
      </div>
      <LabelModalFragment>
        <ItemLabelModal label={label} />
      </LabelModalFragment>
    </Fragment>
  );
};
